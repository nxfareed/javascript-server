import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from './../../config/configuration';
import hasPermissions from './permission';

export default (module, permissionType) => (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log("::AUTHMIDDLEWARE::", module, permissionType);
        const{authorization: token} = req.headers;
      //  const token: string = req.headers.authorization;

        const { secretKey } = config;

        const decodeUser = jwt.verify(token, secretKey);
        if (!decodeUser) {
            next({
                status: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access',
            })
        }
        //console.log(decodeUser)

        if (!hasPermissions(module, decodeUser['role'], permissionType)) {
            next({
                errorCode: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access',
            })
        }

        next();
    }
    catch (error) {
        next({
            errorCode: 403,
            error: 'Unauthorized Access',
            message: error.message,
        });
    }
}
