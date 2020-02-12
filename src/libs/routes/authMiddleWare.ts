import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from './../../config/configuration';
import hasPermissions from './permission';
import IRequest from './IRequest';
import { UserRepository } from "./../../ repositories/user/UserRepository"

export default (module, permissionType) => (req: IRequest, res: Response, next: NextFunction) => {

    try {
        const userRepository = new UserRepository();
        console.log("::AUTHMIDDLEWARE::", module, permissionType);
        const token: string = req.headers.authorization;

        const { secretKey } = config;

        const decodeUser = jwt.verify(token, secretKey);
        console.log(decodeUser);
        if (!decodeUser) {
            next({
                status: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access',
            })
        }
        console.log(decodeUser["role"])
        const { id, email } = decodeUser;

        userRepository.findone({ _id: id, email })
            .then(data => {
                req.user = data;
            }).catch(err => next({
                status: 403,
                error: 'Unauthorized Access',
                message: 'Invalid User',
            }))
            .then(() => {
                if (!hasPermissions(module, decodeUser['role'], permissionType)) {
                    next({
                        status: 403,
                        error: 'Unauthorized Access',
                        message: 'Unauthorized Access',
                    })

                }
                next();
            })
    }
    catch (error) {
        next({
            status: 403,
            error: 'Unauthorized Access',
            message: error.message,
        });
    }
}
