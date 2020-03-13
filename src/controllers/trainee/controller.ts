import { Request, Response } from 'express';
import { UserRepository } from '../../ repositories/user/UserRepository';
import {IRequest, SystemResponse} from './../../libs/index';
import * as bcrypt from 'bcrypt';
class TraineeController {
  static instance: any;
  private userRepository: UserRepository = new UserRepository();
  static getInstance = () => {
    if (TraineeController.instance) {
      return TraineeController.instance;
    }
    TraineeController.instance = new TraineeController();
    return TraineeController.instance;
  }

  create = async (req: IRequest, res: Response) => {
    try {
      const List = await this.userRepository.list(req.query.skip, req.query.limit, {}, { email: { $regex: req.body.email.toLowerCase() } });
      let f = 0;
      List.forEach(element => {
        if (element.email.toLowerCase === req.body.email.toLowerCase)
          f++;
      });
      if (List === undefined || f === 0) {
        const userData = req.body;
        const userId = req.user._id;
        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
        const user = await this.userRepository.create({ ...userData, password: hash });
        if (user) {
          return SystemResponse.success(res, user, 'User Added Successfully');
        }
      }
      else {
        return SystemResponse.error(res, req.body.email, 'User already Exist');
      }
    }
    catch (error) {
      return SystemResponse.error(res, error.message, 'User Addition Unsuccessfull');
    }
  }

  update = async (req: IRequest, res: Response) => {
    try {
      const userData = req.body;
      const userId = req.user._id;
      const user = await this.userRepository.update(userData.id, userData.dataToUpdate, userId);
      if (user) {
        return SystemResponse.success(res, user, 'User Updated Successfully');
      }
    }
    catch (error) {
      return SystemResponse.error(res, error, 'User Updation Unsuccessfull');
    }
  }

  list = async (req: IRequest, res: Response) => {
    try {
      let user;
      const {skip, limit, search} = req.query;
      let sortBy = {};
      if (req.query.sortBy) {
        sortBy[req.query.sortBy] = 1;
      }
      else {
        sortBy = { updatedAt: 1 };
      }
      if (req.query.search !== undefined) {
        user = await this.userRepository.list(skip, limit, sortBy, { name: { $regex: search.toLowerCase() } });
        const List = await this.userRepository.list(skip, limit, sortBy, { email: { $regex: search.toLowerCase() } });
        user = { ...user, ...List };
      } else {
        user = await this.userRepository.list(req.query.skip, req.query.limit, sortBy, {});
      }
      const countTrainee = await this.userRepository.countTrainee();
      const trainee = {
        count: countTrainee,
        records: user,
      };
      if (user) {
        res.send({
          status: 'ok',
          message: 'Data Listed Successfully',
          users: trainee,
        });
      }
    }
    catch (error) {
      return SystemResponse.error(res, error, 'No List Exist');
    }
  }

  delete = async (req: IRequest, res: Response) => {
    try {
        const userData = req.params;
        const userId = req.user._id;
        const user: any = await this.userRepository.delete(userData.id, userId);
        if (user) {
          return SystemResponse.success(res, user, 'User Deleted Successfully');
        }
      }
    catch (error) {
      return SystemResponse.error(res, error, 'User Deletion Unsuccessfull');
    }
  }
}

export default TraineeController.getInstance();
