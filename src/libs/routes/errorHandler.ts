const errorHandler = (err, req, res, next) => {
    console.log('Error', err);
    const errorArray = [];
    if (Array.isArray(err)) {
        err.forEach(element => {
            errorArray.push({
                error: element,
                errorCode: 500,
                message: element,
                timestamp: new Date()

            });
        });
        res.send(errorArray);
    } else {
       

        res.send({
            error: err.error,
            errorCode: err.errorCode,
            message: err.error ||err.arr,
            timestamps: new Date()
        })
    }
}
export default errorHandler;
