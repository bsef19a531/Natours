const express = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("./../../controller/userController");
const router = express.Router();



//Get All user and create a user
router.route("/").get(getAllUsers).post(createUser);

//Get user, update it and delete a user
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;