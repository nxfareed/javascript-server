interface Ipermission {
    'getUsers': {
        all: Array<string>
        read: Array<string>
        write: Array<string>
        delete: Array<string>
    }
}


interface Iusers {
    traineeEmail: string,
    reviewerEmail: string
}
