const express = require("express");
const { getAllTours, saveTour, getTour, updateTour, deleteTour } = require("./../../controller/tourController");

const router = express.Router();

//Get All tour and Post a Tour
router.route("/").get(getAllTours).post(saveTour);

//Get tour, update it and delete a Tour
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);


module.exports = router;