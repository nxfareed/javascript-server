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

    public findOne(query) {
        return this.modelType.findOne(query);
    }

    public async create(options): Promise<D> {
        const id = this.getObjectId();
        delete options.deletedAt;
        return this.modelType.create({
            ...options,
            _id: id,
            originalId: id,
            createdAt: Date.now(),
            
        });

    }
    public async update(id, options): Promise<D> {
        console.log(options);
        const ID = this.getObjectId();
       const result = await this.newUpdatedData(id);
       const doc = result.toJSON();
       console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",doc);
       delete doc.deletedAt;
        return this.modelType.create({
           ...doc,
            ...options,
            
            _id: ID,
            originalId: id,
            updatedAt: Date.now(),
        });
    }
    public async newUpdatedData(id): Promise<D> {
        const data = await this.modelType.findByIdAndUpdate(id, {
            deletedAt: Date.now(),
        });
        return data;
    }

    public async list() {
        return this.modelType.find();
    }

    public async delete(id: string) {
        await this.newUpdatedData(id);
    }
}