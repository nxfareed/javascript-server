import { UserRepository } from './../ repositories/user/UserRepository';

const userRepository = new UserRepository();

export default () => {
    const user = {
        name: 'Head Trainer',
        address: 'Noida',
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
}