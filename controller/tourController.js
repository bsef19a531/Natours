const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    const id = req.params.id * 1;

    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        });
    }

    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "fail",
            message: "No Name or Price Defined"
        })
    }

    next();
}
//CallBack for Tours
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

exports.getTour = (req, res) => {


    const id = req.params.id * 1;
    const tour = tours.find(tr => tr.id === id)
    res.status(200).json({

        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tour
        }
    })
}

exports.saveTour = (req, res) => {
    // console.log(req.body);
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            requestedAt: req.requestTime,
            data: {
                tour: newTour
            }
        })
    })
}


exports.updateTour = (req, res) => {

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
            tour: "<Updated tour...>"
        }
    })
}


exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: "success",
        requestedAt: req.requestTime,
        data: null
    })
}