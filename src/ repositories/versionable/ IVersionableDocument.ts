import * as mongoose from "mongoose";
export default interface IVersionableModel extends mongoose.Document {
    createATt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    deletedAt: Date;
    deletedBy: string
} 