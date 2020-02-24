import { read } from 'fs';
import { Router } from 'express';
import traineeController from './controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from './../../libs/routes/authMiddleWare'

const traineeRouter = Router();
<<<<<<< HEAD
const {get:Get, create:Create, update:Update, delete:Det} = validation;
const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/')
    .get(authMiddleWare('getTrainee', 'read'), validationChecker(Get), list)
=======
const {get, create:Create, update:Update} = validation;
const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/')
    .get(authMiddleWare('getTrainee', 'read'), validationChecker(get), list)
>>>>>>> 661fda6fe12178dafb69b0b215174f6b294a1e91
    .post(authMiddleWare('getTrainee', 'write'), validationChecker(Create), create)
    .put(authMiddleWare('getTrainee', 'write'), validationChecker(Update), update)

traineeRouter.route('/trainee/:id')
    .delete(authMiddleWare('getTrainee', 'delete'), validationChecker(Det), det)
export default traineeRouter; 
