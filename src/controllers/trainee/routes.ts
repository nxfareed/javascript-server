import { Router } from 'express';
import traineeController from './controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';

const traineeRouter = Router();



const { create, list, update, delete: det } = traineeController;
traineeRouter.route('/trainee')
    .get(validationChecker(validation.create), create)
    .post(validationChecker(validation.get), list)
    .put(validationChecker(validation.update), update)
    .delete(validationChecker(validation.delete), det)

export default traineeRouter;