const express = require("express");
// const fs = require("fs");
const tourRouter = require("./routes/tourRoutes/tourRoutes");
const userRouter = require("./routes/userRoutes/userRoutes");
const AppError = require("./utils/error/error");
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



app.use("/api/v1/tours/", tourRouter);

app.use("/api/v1/users/", userRouter);


app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't Find ${req.originalUrl} on the Server`
    // })

    // const err = new Error(`Can't Find ${req.originalUrl} on the Server`);
    // err.status = 'fail';
    // err.statusCode = 404;



    //When something to next express assume it error and skip middlewares and pass it to the error handling middleware
    next(new AppError(`Can't Find ${req.originalUrl} on the Server`, 404));
})

app.use(globalErrorHandler);

module.exports = app;