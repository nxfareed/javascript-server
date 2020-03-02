import { read } from 'fs';
import { Router } from 'express';
import traineeController from './controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from './../../libs/routes/authMiddleWare'

const traineeRouter = Router();
const {get:Get, create:Create, update:Update, delete:Det} = validation;
const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/')
    .get(authMiddleWare('getTrainee', 'read'), validationHandler(Get), list)
    .post(authMiddleWare('getTrainee', 'write'), validationHandler(Create), create)
    .put(authMiddleWare('getTrainee', 'write'), validationHandler(Update), update);

traineeRouter.route('/trainee/:id')
    .delete(authMiddleWare('getTrainee', 'delete'), validationHandler(Det), det);
export default traineeRouter; 
