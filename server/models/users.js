const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true, //throw error if already exist in DB
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        maxlength: [20, 'Max username length is 20 characters'],
        minlength: [3, 'Min username length is 3 characters'],
    },
});

// the first parameter of the model must be the singular of the collection name
module.exports = mongoose.model("user", userSchema);