const users = [
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

function validateEmail(email) {
    const regex = /([a-zA-Z0-9\+_.@])+@successive.tech/gm;
    
    const result = regex.test(email);
    
    return result


}
validateUser(users);
function validateUser(users) {
    let validUser = [];
    let invalidUser = [];

    users.forEach(element => {
        const { traineeEmail, reviewerEmail } = element
        if (validateEmail(reviewerEmail) && validateEmail(traineeEmail)) {

            validUser.push({traineeEmail, reviewerEmail});

        } else {
            invalidUser.push({traineeEmail, reviewerEmail});
        }
    });
    console.log("validUser:" + validUser.length);
    validUser.forEach(element => {
        console.log("valid user email:", element);
    });
    console.log("invalidUser:" + invalidUser.length);
    invalidUser.forEach(element => {
        console.log("invalid user email:", element);
    });
}
