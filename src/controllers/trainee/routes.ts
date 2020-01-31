import { Router } from 'express';
import traineeController from './controller';

const traineeRouter = Router();

traineeRouter.route('/trainee')
.get( traineeController.create )
.post( traineeController.list)
.put( traineeController.update)
.delete( traineeController.delete);

export default traineeRouter;
