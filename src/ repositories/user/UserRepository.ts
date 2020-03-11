import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import IUserCreate from './entities/IUserCreate';
import VersionableRepository from '../versionable/VersionableRepository';

export class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

  private userModel: mongoose.Model<IUserModel>;

  constructor() {
    super(userModel);
  }
  createUser = (data: any, userId) => {
    return super.create(data);
  };
  count = () => {
    return super.count();
  }
  update = (id: string, data: any, userId: string) => {
    return super.update(id, data, undefined);
  }
  list = (skip, limit, sortBy, searchBy) => {
    return super.list(skip, limit, sortBy, searchBy);
  }
  public async delete(id, userId) {
    if (id !== undefined) {
      const data = await super.delete(id, userId);
      return data;
    } else {
      console.log('Please enter Id');
    }
  }
}
