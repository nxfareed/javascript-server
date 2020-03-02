import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './../../ repositories/user/UserRepository'
import SystemResponse from '../../libs/SystemResponse';
import IRequest from './../../libs/routes/IRequest'
import * as bcrypt from 'bcrypt';
import config from '../../config/configuration';
import * as jwt from 'jsonwebtoken';

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

    login = async (req: any, res: Response, next: any) => {
        try {
            console.log('Inside Login' );
            const { email, password } = req.body;
            console.log(req.body ,'******');
            const user = await this.userRepository.findOne({ email });
            if (!user) {
                return next({
                    error: 'User not found',
                    status: 404
                });
            }
            const result = await bcrypt.compare(password, user.password);
            console.log('Result is ', result);
            if (!result) {
                return next({
                    error: 'Password didnt match',
                    status: 422
                });
            }
            console.log('Password matched');
            const token = jwt.sign({ email: user.email, id: user.originalId, role:user.role }, config.secretKey);
            res.status(200).send({
                message: 'Login Successful',
                data: token,
                status: 'Success'
            });
        } catch (err) {
            next({ error: err.message });
        }
    }

    me = (req: IRequest, res: Response, next: NextFunction) => {
        console.log("Inside me routes");
        console.log(req.user)
        res.send(req.user);
    }


    // create = (req: Request, res: Response) => {
    //     try {

    //         console.log(' :::::::::: Inside Create Trainee :::::::: ');

    //         const { email, name, address, hobbies, dob, mobileNumber, role } = req.body;

    //         this.userRepository.create({
    //             email, name, address, hobbies, dob, mobileNumber, role
    //         }).then(user => {
    //             return SystemResponse.success(res, user, 'trainee added successfully');
    //         }).catch(error => {
    //             throw error
    //         })

    //     }
    //     catch (err) {
    //     }
    // };

    // list = (req: Request, res: Response) => {
    //     try {
    //         console.log(' :::::::::: Inside List Trainee :::::::: ');
    //         this.userRepository.list().then(user => {
    //             console.log(user);
    //             return SystemResponse.success(res, user, 'Users List');
    //         }).catch(error => {
    //             throw error
    //         })
    //     }
    //     catch (err) {

    //     }
    // };
    // update = (req: Request, res: Response) => {
    //     try {
    //         console.log(' :::::::::: Inside Update Trainee :::::::: ');
    //         const { id, dataToUpdate } = req.body;
    //         //const { emails, name, address, hobbies, dob, mobileNumber } = dataToUpdate;

    //         this.userRepository.update({ _id: id }, dataToUpdate).then(user => {
    //             this.userRepository.findone({ _id: id }).then(user => {
    //                 return SystemResponse.success(res, user, 'Updated user');
    //             }).catch(error => {
    //                 throw error
    //             })
    //             //return SystemResponse.success(res, user, 'trainee updated successfully');
    //         }).catch(error => {
    //             throw error
    //         })
    //     }
    //     catch (err) {
    //     }
    // };
    // delete = (req: Request, res: Response) => {
    //     try {
    //         console.log(' :::::::::: Inside Delete Trainee :::::::: ');
    //         const { id } = req.params;
    //         this.userRepository.delete({ _id: id }).then(user => {
    //             console.log(user);
    //             return SystemResponse.success(res, user, 'Users List');
    //         }).catch(error => {
    //             throw error
    //         })
    //     }
    //     catch (err) {
    //     }
    // };
}

export default UserController.getInstance();
