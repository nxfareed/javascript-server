import * as mongoose from 'mongoose'
export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    private modelType: M;
    constructor(modelType) {
        this.modelType = modelType;
    }
    count(): mongoose.Query<Number> {
        return this.modelType.countDocuments();
    };
    findOne(query): mongoose.Query<D> {
        return this.modelType.findOne(query);
    };
    public create(options): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        return this.modelType.create({
            ...options,
            _id: id,
            originalId: id,
            createdBy: id
        })
    }





    public update(id, data) {
        this.modelType
            .findById(id)
            .then(user => {
                //console.log('user',user)
                const updatedData = Object.assign(user, data);
                this.updateAndCreate(user);
            })
            .catch(error => {
                throw error;
            });
        const deleteddata = {
            deletedBy: id,
            deletedAt: new Date()
        };
        return this.modelType.update(id, deleteddata);
    }

    public updateAndCreate(options) {
        console.log(options);
        const id = VersionableRepository.generateObjectId();
        return this.modelType.create({
            name: options.name,
            hobbies: options.hobbies,
            email: options.email,
            address: options.address,
            dob: options.dob,
            role: options.role,
            mobileNumber: options.mobileNumber,
            originalID: options.originalID,
            ...options,
            _id: id,
            createdBy: id,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: options.id
        });
    }
    
}
