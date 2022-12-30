const sendErrorDev = (err, res) => {
    // console.log("in dev func");
    // console.log(err.statusCode);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const handleCastErrorDB = err => {
    // console.log("in handleCast");
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const sendErrorProd = (err, res) => {

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }
    else {
        // console.error("Error ✨", err);
        res.status(500).json({
            status: 'Error',
            message: "Something went Wrong"
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    // console.log("here");


    if (process.env.NODE_ENV === 'development') {
        // console.log("in dev");
        sendErrorDev(err, res);
    }
    else /*if (process.env.NODE_ENV === 'production')*/ {

        let error = { ...err };
        if (error.name === 'CastError') {
            console.log("in else");
            error = handleCastErrorDB(error);
        }

        sendErrorProd(error, res);
    }
    // console.log("getting out");
}