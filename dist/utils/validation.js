"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
// validateUser(users);
function validateUser(users) {
    const validUser = [];
    const invalidUser = [];
    users.forEach(element => {
        const { traineeEmail, reviewerEmail } = element;
        if (helpers_1.validateEmail(reviewerEmail) && helpers_1.validateEmail(traineeEmail)) {
            validUser.push({ traineeEmail, reviewerEmail });
        }
        else {
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
exports.default = validateUser;
//# sourceMappingURL=validation.js.map