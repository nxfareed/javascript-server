import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserRepository } from '../../ repositories/user/UserRepository';
import { IRequest, SystemResponse } from './../../libs/index';

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
    const { success, error: Err } = SystemResponse;
    try {
      const { skip, limit } = req.query;
      const List = await this.userRepository.list(skip, limit, {}, { email: { $regex: req.body.email.toLowerCase() } });
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
          return success(res, user, 'User Added Successfully');
        }
      }
      else {
        return Err(res, req.body.email, 'User already Exist');
      }
    }
    catch (error) {
      return Err(res, error.message, 'User Addition Unsuccessfull');
    }
  }

  update = async (req: IRequest, res: Response) => {
    const { success, error: Err } = SystemResponse;
    try {
      const { id, dataToUpdate } = req.body;
      const userId = req.user._id;
      const user = await this.userRepository.update(id, dataToUpdate, userId);
      if (user) {
        return success(res, user, 'User Updated Successfully');
      }
    }
    catch (error) {
      return Err(res, error, 'User Updation Unsuccessfull');
    }
  }

  list = async (req: IRequest, res: Response) => {
    const { success, error: Err } = SystemResponse;
    try {
      let user;
      const { skip, limit, search, sortBy: Sort } = req.query;
      let sortBy = {};
      if (Sort) {
        sortBy[Sort] = 1;
      }
      else {
        sortBy = { updatedAt: 1 };
      }
      if (search !== undefined) {
        user = await this.userRepository.list(skip, limit, sortBy, { name: { $regex: search.toLowerCase() } });
        const List = await this.userRepository.list(skip, limit, sortBy, { email: { $regex: search.toLowerCase() } });
        user = { ...user, ...List };
      } else {
        user = await this.userRepository.list(skip, limit, sortBy, {});
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
      return Err(res, error, 'No List Exist');
    }
  }

  delete = async (req: IRequest, res: Response) => {
    const { success, error: Err } = SystemResponse;
    try {
      const userData = req.params;
      const userId = req.user._id;
      const user: any = await this.userRepository.delete(userData.id, userId);
      if (user) {
        return success(res, user, 'User Deleted Successfully');
      }
    }
    catch (error) {
      return Err(res, error, 'User Deletion Unsuccessfull');
    }
  }
}

export default TraineeController.getInstance();
