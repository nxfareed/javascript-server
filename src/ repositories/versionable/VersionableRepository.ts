import * as mongoose from 'mongoose';
import IVersionableModel from './ IVersionableDocument';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {

  constructor(modelType: any) {
    this.modelType = modelType;
  }
  public getObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  public modelType: M;

  public count() {
    return this.modelType.countDocuments();
  }

  public countTrainee() {
    return this.modelType.countDocuments({ deletedAt: undefined });
  }

  public async findOne(query) {
    const rn = await this.modelType.findOne(query).lean();
    return rn;
  }

  public async create(options): Promise<D> {
    const id = this.getObjectId();
    return this.modelType.create({
      ...options,
      _id: id,
      originalId: id,
      createdAt: Date.now(),
      createdBy: id
    });

  }
  public async update(id, options, userId): Promise<D> {
    const ID = this.getObjectId();
    const result = await this.newUpdatedData(id, userId);
    const doc = result.toJSON();
    delete doc.deletedAt;
    return this.modelType.create({
      ...doc,
      ...options,

      _id: ID,
      originalId: id,
      updatedAt: Date.now(),
    });
  }
  public async newUpdatedData(id, userId): Promise<D> {
    mongoose.set('useFindAndModify', false);
    const data = await this.modelType.findByIdAndUpdate(id, {
      deletedAt: Date.now(),
      deletedBy: userId
    });
    return data;
  }

  public async list(skip, limit, sortBy, searchBy) {
    return this.modelType.find({ deletedAt: undefined, ...searchBy }).sort(sortBy).skip(Number(skip)).limit(Number(limit));
  }

  public async delete(id: string, userId) {
    const rec = await this.newUpdatedData(id, userId);
    return rec;
  }
}
