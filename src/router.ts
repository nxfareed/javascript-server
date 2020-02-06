import { Router } from 'express';
import { traineeRouter } from './controllers/trainee/index';

const mainRouter = Router();
mainRouter.use('/', traineeRouter);

export default mainRouter;
