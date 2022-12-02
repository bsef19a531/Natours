const express = require("express");
const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../../data/tours-simple.json`));

const router = express.Router();

//CallBack for Tours
const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

const getTour = (req, res) => {

    const id = req.params.id * 1;

    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        });
    }

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

const saveTour = (req, res) => {
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


const updateTour = (req, res) => {

    const id = req.params.id * 1;
    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
            tour: "<Updated tour...>"
        }
    })
}


const deleteTour = (req, res) => {

    const id = req.params.id * 1;
    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        })
    }

    res.status(204).json({
        status: "success",
        requestedAt: req.requestTime,
        data: null
    })
}

///////////////////////////////////////////

//Get All tour and Post a Tour
router.route("/").get(getAllTours).post(saveTour);

//Get tour, update it and delete a Tour
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);


module.exports = router;