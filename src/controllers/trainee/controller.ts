import { Request, Response } from 'express';
import { UserRepository } from '../../ repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import IRequest from './../../libs/routes/IRequest';
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

    console.log(':::::::::::::::::::CREATE USER:::::::::::::::::::');
    try {
      const userData = req.body;
      const userId = req.user._id;
      const hash = await bcrypt.hash(userData.password, 10);
      userData.password = hash;
      const user = await this.userRepository.create({ ...userData, password: hash });
      if (user) {
        return SystemResponse.success(res, user, 'User Added Successfully');
      }

    }
    catch (error) {
      return SystemResponse.error(res, error.message, 'User Added UnSuccessfull');
    }

  }

  update = async (req: IRequest, res: Response) => {
    console.log(':::::::::::::::::::UPDATE USER:::::::::::::::::::');
    try {
      const userData = req.body;
      const userId = req.user._id;
      const user = await this.userRepository.update(userData.id, userData.dataToUpdate, userId);
      if (user) {
        return SystemResponse.success(res, user, 'User Updated Successfully');
      }
    }
    catch (error) {
      return SystemResponse.error(res, error, 'User Updated UnSuccessfull');
    }
  }
  // list = async (req: Request, res: Response) => {
  //   console.log(':::::::::::::::::::USER LIST::::::::::::::::::::');
  //   try {
  //       let user;
  //       console.log('::::::::::::::::::::-INSIDE LIST TRAINEE-::::::::::::::::::::');
  //       let sortBy = {};
  //       if (req.query.sortBy) {
  //           sortBy[req.query.sortBy] = 1;
  //       }
  //       else {
  //           sortBy = { updatedAt: 1 };
  //       }
  //       if (req.query.search !== undefined) {
  //           user = await this.userRepository.list('trainee', req.query.skip, req.query.limit, sortBy, { name: { $regex: req.query.search.toLowerCase() } });
  //           const List = await this.userRepository.list('trainee', req.query.skip, req.query.limit, sortBy, { email: { $regex: req.query.search.toLowerCase() } });
  //           user = { ...user, ...List };
  //       } else {
  //           user = await this.userRepository.list('trainee', req.query.skip, req.query.limit, sortBy, {});
  //       }
  //       const countTrainee = await this.userRepository.countTrainee();
  //       const trainee = {
  //           count: countTrainee,
  //           records: user,
  //       };
  //       if (user) {
  //           res.send({
  //               status: 'ok',
  //               message: 'Data Listed Successfully',
  //               users: trainee,
  //           });
  //       }
  //   }





  list = async (req: IRequest, res: Response) => {
    console.log(':::::::::::::::::::USER LIST::::::::::::::::::::');
    try {
      let user;
      console.log('::::::::::::::::::::-INSIDE LIST TRAINEE-::::::::::::::::::::');
      let sortBy = {};
      if (req.query.sortBy) {
        sortBy[req.query.sortBy] = 1;
      }
      else {
        sortBy = { updatedAt: 1 };
      }
      if (req.query.search !== undefined) {
        user = await this.userRepository.list( req.query.skip, req.query.limit, sortBy, { name: { $regex: req.query.search.toLowerCase() } });
        const List = await this.userRepository.list( req.query.skip, req.query.limit, sortBy, { email: { $regex: req.query.search.toLowerCase() } });
        user = { ...user, ...List };
      } else {
        user = await this.userRepository.list( req.query.skip, req.query.limit, sortBy, {});
        console.log("asssssasasasasasasasasas",user);
      }
      // user = await this.userRepository.list('trainee', req.query.skip, req.query.limit, sortBy, {});
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
    console.log(':::::::::::::::::::Delete USER:::::::::::::::::::');
    try {
      const userData = req.params;
      const userId = req.user._id;
      const user: any = await this.userRepository.delete(userData.id, userId);

      if (user) {
        return SystemResponse.success(res, user, 'User Deleted Successfully');
      }
    }
    catch (error) {
      return SystemResponse.error(res, error, 'User Deleted UnSuccessfull');
    }
  }




}

export default TraineeController.getInstance();
