import { Router } from 'express';
import { traineeRouter } from './controllers/trainee/index';
import { userRouter } from './controllers/user/index';

const mainRouter = Router();
mainRouter.use('/trainee', traineeRouter);
mainRouter.use('/user', userRouter);
export default mainRouter;
