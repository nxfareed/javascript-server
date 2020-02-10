import { Router } from 'express';
import traineeController from './controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from './../../libs/routes/authMiddleWare'
import { read } from 'fs';

const traineeRouter = Router();



const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/trainee')
    .get(authMiddleWare('getUsers', 'read'),validationChecker(validation.get), list)
    .post(authMiddleWare('getUsers', 'delete'),validationChecker(validation.create), create)
    .put(authMiddleWare('getUsers', 'read'),validationChecker(validation.update), update)
    .delete(authMiddleWare('getUsers', 'read'),validationChecker(validation.delete), det)
    traineeRouter.delete('/trainee/:id',validationChecker(validation.delete), det)
export default traineeRouter;