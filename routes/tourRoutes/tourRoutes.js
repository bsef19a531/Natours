const express = require("express");
const { getAllTours, saveTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats } = require("./../../controller/tourController");

const router = express.Router();

// router.param("id", checkID)

//Get All tour and Post a Tour
// router.route("/").get(getAllTours).post(checkBody, saveTour);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats)

router.route("/").get(getAllTours).post(saveTour);

//Get tour, update it and delete a Tour
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);


module.exports = router;