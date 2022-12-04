const fs = require("fs");
const Tour = require("./../models/tourModels");

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
//CallBack for Tours
exports.getAllTours = async (req, res) => {
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

    try {

        // filtering
        const queryObj = { ...req.query };
        let queryStr = JSON.stringify(queryObj);

        // Advance filtering
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        const tours = await Tour.find(JSON.parse(queryStr));
        res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
                tours: tours
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message: err
        })
    }


};

exports.getTour = async (req, res) => {


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

    try {
        const tour = await Tour.findById(req.params.id);
        //Tour.finOne({_id: req.params.id});

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    }
    catch (err) { }
}

exports.saveTour = async (req, res) => {
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
    try {
        const newTour = await Tour.create(req.body);

        res.status(200).json({
            tour: newTour
        });
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
}


exports.updateTour = async (req, res) => {

    try {

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: "Error Occured"
        })
    }
}


exports.deleteTour = async (req, res) => {
    try {

        const tour = await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: "success",
            data: null
        })
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Error Occured"
        })
    }
}