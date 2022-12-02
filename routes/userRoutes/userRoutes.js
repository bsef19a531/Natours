const express = require("express");

const router = express.Router();

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}



//Get All user and create a user
router.route("/").get(getAllUsers).post(createUser);

//Get user, update it and delete a user
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;