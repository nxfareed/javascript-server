import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './../../ repositories/user/UserRepository'
import {IRequest, SystemResponse} from './../../libs/index';
import config from '../../config/configuration';

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
                    error: 'Password did not match',
                    status: 422
                });
            }
            console.log('Password matched');
            const token = jwt.sign({ email: user.email, id: user.originalId, role:user.role, exp: Math.floor(Date.now() / 1000) + 15 * 60 }, config.secretKey);
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
}

export default UserController.getInstance();
