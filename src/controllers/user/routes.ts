import * as express from 'express';
import userController from './controller';
import validation from './validation';
import validationHandler from './../../libs/routes/validationHandler'
import authMiddleware from './../../libs/routes/authMiddleWare'
const userRouter = express.Router();
const { get: Get, create: Create, update: Update, delete: Det } = validation;
const { me, login } = userController;
userRouter.route('/')
//     .get(authMiddleware('getUsers', 'read'), ,validationHandler(Get), list)
//     .post(authMiddleware('getUsers', 'write'), validationHandler(Create), create)
//     .put(authMiddleware('getUsers', 'write'), validationHandler(Update), update);
// userRouter.delete('/:id', authMiddleware('getUsers', 'delete'), validationHandler(Det), det)

userRouter.route('/me').get(authMiddleware('getUsers', 'read'),validationHandler(Get), me);
userRouter.route('/login').post(login);

export default userRouter;
