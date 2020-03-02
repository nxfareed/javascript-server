import * as express from 'express';
import userController from './controller';
import validation from './validation';
import validationHandler from './../../libs/routes/validationHandler'
import authMiddleware from './../../libs/routes/authMiddleWare'
const userRouter = express.Router();


userRouter.route('/')
    .get(authMiddleware('getUsers', 'read'), validationHandler(validation.get), userController.list)
    .post(authMiddleware('getUsers', 'write'), validationHandler(validation.create), userController.create)
    .put(authMiddleware('getUsers', 'write'), validationHandler(validation.update), userController.update);
userRouter.delete('/:id', authMiddleware('getUsers', 'delete'), validationHandler(validation.delete), userController.delete)

userRouter.route('/me').get(authMiddleware('getUsers', 'read'), userController.me);

export default userRouter;
