export const validation = {
    create:
    {
        id: {
            required: true,
            string: true,
            in: ['body'],
            custom: ((value) => {
                console.log('now you are in custom');
                if (!value) { }
            })
        },
        name: {
            required: true,
            regex: '([a-zA-Z])+ ?([a-zA-Z])+$',
            in: ['body'],
            errorMessage:{
                message: 'Name is required',
                timestamp: new Date()
            }
        }
    },
    delete: {
        id: {
            required: true,
            in: ['params'],
            errorMessage:{
                message: 'Id is required',
                timestamp: new Date()
            }
        }
    },
    get: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage:{
                message: 'Skip is invalid',
                timestamp: new Date()
            }
        },
        limit: {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage:{
                message: 'Limit is invalid',
                timestamp: new Date();
            }

        }
    },
    update: {
        id: {
            required: true,
            string: true,
            in: ['body']
        },
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: (dataToUpdate) => {
                {
                    console.log('now you are in custom');
                    if (!dataToUpdate) { };
                }
            },
        }
    }
};
export default validation;