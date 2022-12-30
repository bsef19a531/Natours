const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm a password"],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;