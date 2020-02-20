import { read } from 'fs';
import { Router } from 'express';
import traineeController from './controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from './../../libs/routes/authMiddleWare'

const traineeRouter = Router();
const {get, create:Create, update:Update} = validation;
const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/')
    .get(authMiddleWare('getTrainee', 'read'), validationChecker(get), list)
    .post(authMiddleWare('getTrainee', 'write'), validationChecker(Create), create)
    .put(authMiddleWare('getTrainee', 'write'), validationChecker(Update), update)

traineeRouter.route('/trainee/:id')
    .delete(authMiddleWare('getTrainee', 'delete'), validationChecker(validation.delete), det)
export default traineeRouter; 
