import { validateEmail } from './helpers';
// validateUser(users);
export default function validateUser(users: Iusers[]): void {
    const validUser = [];
    const invalidUser = [];

    users.forEach(element => {
        const { traineeEmail, reviewerEmail } = element;
        if (validateEmail(reviewerEmail) && validateEmail(traineeEmail)) {

            validUser.push({ traineeEmail, reviewerEmail });

        } else {
            invalidUser.push({ traineeEmail, reviewerEmail });
        }
    });
    console.log('validUser:' + validUser.length);
    validUser.forEach(element => {
        console.log('valid user email:', element);
    });
    console.log('invalidUser:' + invalidUser.length);
    invalidUser.forEach(element => {
        console.log('invalid user email:', element);
    });
}
