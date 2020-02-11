import * as mongoose from 'mongoose';


export default interface IUserModel extends mongoose.Document {
    _id: string;
    name: string;
    address: string;
    email: string;
    dob: Date;
    mobileNumber: number;
    role: string;
    hobbies: string[];
}