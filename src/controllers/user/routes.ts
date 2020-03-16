import * as express from 'express';
import userController from './controller';
import validation from './validation';
import validationHandler from './../../libs/routes/validationHandler'
import authMiddleware from './../../libs/routes/authMiddleWare'

const userRouter = express.Router();
const { get: Get, create: Create, update: Update, delete: Det } = validation;
const { me, login } = userController;
/**
 * @swagger
 *
 *  definitions:
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: vinay@nodeexperts.com
 *          password:
 *              type: string
 *              example: qwertyasdfgh
 *      Token:
 *           type: object
 *           properties:
 *               status:
 *                   example: OK
 *               message:
 *                   example: Success
 *               data:
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmF5QG5vZGVleHBlcnRzLmNvbSIsImlkIjoiNWU2OGRjMWZlZjk1OWMzNTQ1OTMwNTExIiwicm9sZSI6ImhlYWQtdHJhaW5lciIsImV4cCI6MTU4NDA4MjMzNSwiaWF0IjoxNTg0MDgxNDM1fQ.IPd-27EP89Q1sYMgxwHDstSx0aJ4PnJRmKxAY9vrAg0
 */


/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     description: Current user's Detail
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *             $ref: '#/definitions/TraineeResponse'
 */
userRouter.route('/')
userRouter.route('/me').get(authMiddleware('getUsers', 'read'), validationHandler(Get), me);
/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login Credentials
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User's email and Password
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: Login
 *         schema:
 *              $ref: '#/definitions/Token'
 *       422:
 *         description: Invalid Email or Password
 *         schema:
 *          oneOf:
 *          properties:
 *              status:
 *                  example: "Bad Request"
 *              message:
 *                  example: Password didn't match
 *              err:
 *                  example: Password is incorrect
 */
userRouter.route('/login').post(login);

export default userRouter;
