import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import IUserCreate from './entities/IUserCreate';

export class UserRepository {
    private userModel: mongoose.Model<IUserModel>;

    constructor() {
        this.userModel = userModel;
    }

    private generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    create = (data) => {
        const userData = {
            _id: this.generateObjectId(),
            ...data
        }
        return this.userModel.create(userData);
    }

    count = () => {
        //console.log("hello");
        return this.userModel.countDocuments();
    }

    findone = (query) => {
        console.log(query)
        return this.userModel.findOne(query);
    }

    update = (id, data) => {
        return this.userModel.update(id, data);
    }

    list = () => {
        return this.userModel.find();
    }

    delete = (id) => {
        return this.userModel.findByIdAndDelete(id);
    }
}