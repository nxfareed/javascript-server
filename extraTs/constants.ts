export let permissions : Ipermission = {
    'getUsers': {
        all: ['head-trainer'],
        read:['trainee', 'trainer'],
        write: ['trainer'],delete: []
    }
};

export const users : Iusers[] = [
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
]