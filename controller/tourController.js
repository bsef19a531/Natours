//const fs = require("fs");
const catchAsync = require('./../utils/error/AsyncCatch');
const Tour = require("./../models/tourModels");
const APIFeatures = require('./../utils/tours/APIFeatures');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));

// exports.checkID = (req, res, next, val) => {
//     const id = req.params.id * 1;

//     if (id >= tours.length) {
//         return res.status(404).json({
//             status: "fail",
//             requestedAt: req.requestTime,
//             message: "Invalid ID"
//         });
//     }

//     next();
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: "fail",
//             message: "No Name or Price Defined"
//         })
//     }

//     next();
// }
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,duration,difficulty,rating,summary,ratingAverage';
    next();
}



//CallBack for Tours
exports.getAllTours = catchAsync(async (req, res, next) => {
    // res.status(200).json({
    //     status: "success",
    //     requestedAt: req.requestTime,
    //     results: tours.length,
    //     data: {
    //         tours: tours
    //     }
    // })
    // const tours = await Tour.find().where('duration').equals(5);
    // const tours = await Tour.find({duration: 5, difficulty: 'easy'});



    //Build Query
    // //1A)Filtering
    // const queryObj = { ...req.query };
    // const excludeFields = ['page', 'sort', 'limit', 'fields']
    // excludeFields.forEach(element => {
    //     delete queryObj[element];
    // });

    // //1B)Advance Filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
    // // console.log(JSON.parse(queryStr));

    // let query = Tour.find(JSON.parse(queryStr));

    // //console.log(req.query, queryObj, queryStr);

    // //2 Sorting
    // //console.log(req.query, req.query.sort);
    // if (req.query.sort) {
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     //console.log(sortBy);
    //     query = query.sort(req.query.sort);
    // }
    // else {
    //     query = query.sort('-createdAt');
    // }

    // //3 Field Limiting

    // if (req.query.fields) {
    //     const fields = req.query.fields.split(',').join(' ');
    //     query = query.select(fields);
    // }
    // else {
    //     query = query.select('-__v');
    // }

    //4 Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //     const numTours = await Tour.countDocuments();
    //     if (skip > numTours) throw new Error("This page does not exist");
    // }


    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination();

    //Execute query
    const tours = await features.query;

    // const tours = await Tour.find(JSON.parse(queryStr));

    //SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
});

exports.getTour = catchAsync(async (req, res, next) => {


    // const id = req.params.id * 1;
    // const tour = tours.find(tr => tr.id === id)
    // res.status(200).json({

    //     status: "success",
    //     requestedAt: req.requestTime,
    //     results: tours.length,
    //     data: {
    //         tour
    //     }
    // })


    const tour = await Tour.findById(req.params.id);
    //Tour.finOne({_id: req.params.id});

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })

})

exports.saveTour = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    // const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);

    // tours.push(newTour);

    // fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    //     res.status(201).json({
    //         status: "success",
    //         requestedAt: req.requestTime,
    //         data: {
    //             tour: newTour
    //         }
    //     })
    // })

    const newTour = await Tour.create(req.body);

    res.status(200).json({
        tour: newTour
    });

})


exports.updateTour = catchAsync(async (req, res, next) => {



    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })

})


exports.deleteTour = catchAsync(async (req, res, next) => {


    const tour = await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: "success",
        data: null
    })

})


exports.getTourStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match: { ratingAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: "$difficulty" },
                numTours: { $sum: 1 },
                avgRating: { $avg: '$ratingAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: {
                avgPrice: 1
            }
        },
        {
            $match: { _id: { $ne: "EASY" } }
        }
    ]);

    res.status(200).json({
        status: "success",
        data: {
            stats
        }
    })

})


exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTours: { $sum: 1 },
                tours: { $push: '$name' }
            },
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numTours: -1 }
        },
        // {
        //     $limit: 6
        // }
    ]);

    res.status(200).json({
        status: "success",
        results: plan.length,
        data: {
            plan
        }
    })

})