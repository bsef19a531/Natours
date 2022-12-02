const express = require("express");
const fs = require("fs");
const tourRouter = require("./routes/tourRoutes/tourRoutes");
const userRouter = require("./routes/userRoutes/userRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



app.use("/api/v1/tours/", tourRouter);

app.use("/api/v1/users/", userRouter);

module.exports = app;