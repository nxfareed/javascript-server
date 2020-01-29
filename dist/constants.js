"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'], delete: []
    }
};
exports.users = [
    {
        traineeEmail: 'trainee@successive.tech',
        reviewerEmail: 'reviewer@successive.tech',
    },
    {
        traineeEmail: 'trainee@successive.tech',
        reviewerEmail: 'reviewer@successive.tech',
    },
    {
        traineeEmail: 'trainee2@sucssive.tech',
        reviewerEmail: 'reviewer2@successive.tech',
    },
    {
        traineeEmail: 'trainee3@successive.tech',
        reviewerEmail: 'reviewer3@successive.tech',
    },
];
//# sourceMappingURL=constants.js.map