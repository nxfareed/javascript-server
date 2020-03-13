import * as mongoose from 'mongoose';


export default interface IUserModel extends mongoose.Document {
    _id: string;
    name: string;
    address: string;
    email: string;
    dob: Date;
    password: string;
    originalId: string;
    mobileNumber: number;
    role: string;
    hobbies: string[];
}