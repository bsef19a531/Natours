const mongoose = require("mongoose");
//const validator = require("validator");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour must have a Name"],
        unique: true,
        trim: true,
        maxlength: [40, 'Tour name must have max 40 character'],
        minlength: [10, 'Tour name must have min 10 character'],
        //validate: [validator.isAlpha, 'Tour name must only include alphabets']
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
        enum: {
            values: ["easy", "medium", "difficult"],
            message: 'A tour difficulty can either be only "easy", "medium", "difficult"'
        }
    }
    ,
    ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating min can be above 1.0"],
        max: [5, "Rating max can be below 5.0"]
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Tour Must have Price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            //Will Not work on the Update only this will point the new document created
            validator: function (val) { return val < this.price },
            message: "Discount Price({VALUE}) should be below regular price"
        }
    },
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
        default: Date.now(),
        select: false
    },
    startDates: [Date] //2021-03-21,11:32 UNIX time stamp
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//The Virtual Properties are not part of DB or Query Object

tourSchema.virtual("durationWeeks").get(function () { return this.duration / 7 });

//Document Middleware: runs between .save() and .create() and not in insert many
// tourSchema.pre('save', function () { console.log(this); })

const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;