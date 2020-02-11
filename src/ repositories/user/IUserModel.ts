import * as mongoose from 'mongoose';


export default interface IUserModel extends mongoose.Document {
    _id: string;
    name: string;
    address: string;
    emails: string;
    dob: Date;
    mobileNumber: number;
    role: string;
    hobbies: string[];
}