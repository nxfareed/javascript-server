
import * as mongoose from 'mongoose'
export default class VersionScema extends mongoose.Schema {
    constructor(schema, options) {
        const baseSchema = {
            createdAt: {
                type: Date,
                default: Date.now
            },
            originalId: String,
            updatedAt: Date,
            createdBy: String,
            deletedBy: String,
            updatedBy: String,
            deletedAt: String,
        }
        super({ ...schema, ...baseSchema }, options);
    }
}