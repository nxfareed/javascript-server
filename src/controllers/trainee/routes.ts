import { Router } from 'express';
import traineeController from './controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from './../../libs/routes/authMiddleWare'

const traineeRouter = Router();
const {get:Get, create:Create, update:Update, delete:Det} = validation;
const { create, list, update, delete: det } = traineeController;

/**
 * @swagger
 *
 *  definitions:
 *      TraineePost:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: fareed.zaman@successive.tech
 *          name:
 *              type: string
 *              example: Fareed
 *          password:
 *              type: string
 *              example: qwerty
 *          mobileNumber:
 *              type: number
 *              example: "987654321"
 *          address:
 *              type: string
 *              example: Lucknow
 *          dob:
 *              type: Date
 *              example: 23/23/2323
 *          role:
 *               type: string
 *               example: trainee
 *          hobbies:
 *               type: array
 *               example: ["basketball"]
 *
 *      TraineeResponse:
 *        type: object
 *        properties:
 *          _id:
 *              example: 1a1b1c1d1e1f1g1h1i1j1k1l1
 *          email:
 *              type: string
 *              example: fareed.zaman@successive.tech
 *          name:
 *              type: string
 *              example: Fareed
 *          mob:
 *              type: number
 *              example: "987654321"
 *          address:
 *              type: string
 *              example: Lucknow
 *          dob:
 *              type: Date
 *              example: 23/23/2323
 *          role:
 *              type: string
 *              example: trainee
 *          hobbies:
 *              type: array
 *              example: ["Basketball"]
 *          originalId:
 *              example: 1a1b1c1d1e1f1g1h1i1j1k1l1
 *          createdBy:
 *              example: m1n1o1p1q1r1s1t1u1v1w1x1y
 *          createdAt:
 *              example: 2323-23-20T20:45:40.123Z
 *          v:
 *              example:0
 *      Unauthorized:
 *        type: object
 *        properties:
 *          error:
 *              example: Unauthorized
 *          message:
 *              example: Token not found
 *          status:
 *              example: 403
 *          timestamp:
 *               example: 2323-23-20T20:45:40.123Z
 *
 */
traineeRouter.route('/')

/**
 * @swagger
 *
 * /api/trainee:
 *   get:
 *     tags:
 *       - Trainee
 *     description: Returns the list of the trainees
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: skip
 *         description: Elements to be Skipped
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: Number of elements to be displayed
 *         in: query
 *         required: false
 *         type: number
 *       - name: sortBy
 *         description: Elements to be sorted By
 *         in: query
 *         required: false
 *         type: string
 *       - name: search
 *         description: Element to be searched
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Trainee List
 *         schema:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: 'Trainee List , Number of trainee: 4'
 *                  count:
 *                      example: 2
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: Unauthorised Access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .get(authMiddleWare('getTrainee', 'read'), validationHandler(Get), list)

/**
 * @swagger
 *
 * /api/trainee:
 *   post:
 *     tags:
 *       - Trainee
 *     description: Returns the reponse on successfull creation
 *     security:
 *          - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User Data.
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/TraineePost'
 *     responses:
 *       200:
 *         description: User Created Successfully
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: Trainee Created Successfully
 *                  data:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/definitions/TraineeResponse'
 *                      properties:
 *                              password:
 *                                  type: string
 *                                  example: "*****************"
 *       403:
 *         description: Unauthorised Access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .post(authMiddleWare('getTrainee', 'write'), validationHandler(Create), create)

/**
 * @swagger
 *
 * /api/trainee:
 *   put:
 *     tags:
 *       - Trainee
 *     description: Return the reponse on Successfull Creation
 *     security:
 *          - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User Data.
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *          oneOf:
 *          properties:
 *              id:
 *                  example: 1a1b1c1d1e1f1g1h1i1j1k1l1
 *              dataToUpdate:
 *                  type: object
 *                  allOf:
 *                      - $ref: '#/definitions/TraineePost'
 *     responses:
 *       200:
 *         description: User data Updated Successfully
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      example: Ok
 *                  message:
 *                      example: User data Updated Successfully
 *                  data:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: Unauthorised Access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .put(authMiddleWare('getTrainee', 'write'), validationHandler(Update), update);

traineeRouter.route('/:id')
/**
 * @swagger
 *
 * /api/trainee/{id}:
 *   delete:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on creation
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of User to be deleted.
 *         in: path
 *         required: true
 *         type: string
 *         example: 1a1b1c1d1e1f1g1h1i1j1k1l1
 *     responses:
 *       200:
 *         description: Data Deleted Successfully
 *         schema:
 *              allOf[]:
 *              properties:
 *                  status:
 *                      example: OK
 *              message:
 *                      example: User data deleted successfully
 *              data:
 *                      example: 1a1b1c1d1e1f1g1h1i1j1k1l1
 *       403:
 *         description: Unauthorised Access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .delete(authMiddleWare('getTrainee', 'delete'), validationHandler(Det), det);
export default traineeRouter;
