import * as bcrypt from 'bcrypt';
import { UserRepository } from './../ repositories/user/UserRepository';
import config from '../config/configuration';

const userRepository = new UserRepository();

export default () =>
  bcrypt.hash(config.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const user = {
      name: 'Head Trainer',
      address: 'Noida',
      password: hash,
      dob: new Date('12/27/1993'),
      email: 'vinay@nodeexperts.com',
      mobileNumber: 9718223533,
      role: "head-trainer",
      hobbies: ['Touring']
    };

    userRepository.count().then((count) => {
      console.log('Count as users is', count);
      if (!count) {
        return userRepository.create(user)
          .then((res) => {
            console.log('User seeded successfully', res);
          });
      }
      console.log('User already seeded')
    })
      .catch((err) => console.log(err));
  })
