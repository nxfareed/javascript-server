import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';


const toConvert = {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
    }
};
export const userSchema = new UserSchema(
    {
        collection: 'Users',
        toJSON: toConvert,
        toObject: toConvert
    });

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema, 'Users', true);
