import { Request, Response } from 'express';
import { UserRepository } from './../../ repositories/user/UserRepository'
import SystemResponse from '../../libs/SystemResponse'

class UserController {
    static instance: UserController;
    static userRepository: UserRepository;

    userRepository = new UserRepository();

    static getInstance = () => {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    create = (req: Request, res: Response) => {
        try {

            console.log(' :::::::::: Inside Create Trainee :::::::: ');

            const { emails, name, address, hobbies, dob, mobileNumber, role } = req.body;

            this.userRepository.create({
                emails, name, address, hobbies, dob, mobileNumber, role
            }).then(user => {
                return SystemResponse.success(res, user, 'trainee added successfully');
            }).catch(error => {
                throw error
            })

        }
        catch (err) {
        }
    };

    list = (req: Request, res: Response) => {
        try {
            console.log(' :::::::::: Inside List Trainee :::::::: ');
            this.userRepository.list().then(user => {
                console.log(user);
                return SystemResponse.success(res, user, 'Users List');
            }).catch(error => {
                throw error
            })
        }
        catch (err) {

        }
    };
    update = (req: Request, res: Response) => {
        try {
            console.log(' :::::::::: Inside Update Trainee :::::::: ');
            const { id, dataToUpdate } = req.body;
            //const { emails, name, address, hobbies, dob, mobileNumber } = dataToUpdate;

            this.userRepository.update({ _id: id }, dataToUpdate).then(user => {
                this.userRepository.findone({ _id: id }).then(user => {
                    return SystemResponse.success(res, user, 'Updated user');
                }).catch(error => {
                    throw error
                })
                //return SystemResponse.success(res, user, 'trainee updated successfully');
            }).catch(error => {
                throw error
            })
        }
        catch (err) {
        }
    };
    delete = (req: Request, res: Response) => {
        try {
            console.log(' :::::::::: Inside Delete Trainee :::::::: ');
            const { id } = req.params;
            this.userRepository.delete({ _id: id }).then(user => {
                console.log(user);
                return SystemResponse.success(res, user, 'Users List');
            }).catch(error => {
                throw error
            })
        }
        catch (err) {
        }
    };
}

export default UserController.getInstance();
