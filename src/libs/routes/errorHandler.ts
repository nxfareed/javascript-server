const errorHandler = (err, req, res, next) => {
    console.log('Error', err);
    res.send({
        error: err.error,
        status: err.code,
        message: err.error || err.message,
        timestamp: new Date()
    })
}
export default errorHandler;
