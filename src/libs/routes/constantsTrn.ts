export let permissions = {
    'getTrainee': {
        
        read:['trainee', 'trainer', 'head-trainer'],
        write: ['trainer','head-trainer'],
        delete: ['head-trainer']
    }
};

export const users = [
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