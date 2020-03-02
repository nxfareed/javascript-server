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

    private generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    create = (data:any) => {
        const userData = {
            _id: this.generateObjectId(),
            ...data
        }
        return super.create(data);
    }

    count = () => {
        //console.log("hello");
        return super.count();
    }

    findone = (query) => {
        console.log(query)

        return super.findOne(query);
    }

    update = (id, data) => {
        return super.update(id, data);
    }

    list = () => {
        return super.list();
    }

    delete = (id) => {
        return super.delete(id);
    }
}