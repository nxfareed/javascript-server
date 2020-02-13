import { read } from 'fs';
import { Router } from 'express';
import traineeController from './controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from './../../libs/routes/authMiddleWare'

const traineeRouter = Router();

const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/trainee')
    .get(authMiddleWare('getTrainee', 'read'), validationChecker(validation.get), list)
    .post(authMiddleWare('getTrainee', 'write'), validationChecker(validation.create), create)
    .put(authMiddleWare('getTrainee', 'write'), validationChecker(validation.update), update)
    .delete(authMiddleWare('getTrainee', 'delete'), validationChecker(validation.delete), det)
export default traineeRouter; 
