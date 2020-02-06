import { Router } from 'express';
import traineeController from './controller';

const traineeRouter = Router();



const { create, list, update } = traineeController;
traineeRouter.route('/trainee')
    .get(create)
    .post(list)
    .put(update)
    .delete(traineeController.delete)

export default traineeRouter;
