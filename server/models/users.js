const mongoose = require("mongoose");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true, //throw error if already exist in DB
        lowercase: true,
        validate: [isEmail, 'Pleae enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
})

// the first parameter of the model must be the singular of the collection name
module.exports = mongoose.model("user", userSchema)