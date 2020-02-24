import * as mongoose from "mongoose";
export default interface IVersionableModel extends mongoose.Document {
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    deletedAt: Date;
    deletedBy: string;
    
    originalId: any;
} 