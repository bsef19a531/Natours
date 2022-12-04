const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour must have a Name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "Tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "Tour must have maxgroup size defined"]
    },
    difficulty: {
        type: String,
        required: [true, "Tour must have difficuilty level"],
    }
    ,
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Tour Must have Price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "Tour musthave a description"]
    },
    imageCover: {
        type: String,
        required: [true, "TOur must have a cover Image"]
    },
    Image: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date] //2021-03-21,11:32 UNIX time stamp
});

const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;