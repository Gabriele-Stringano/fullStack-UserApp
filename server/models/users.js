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
        validate: [isEmail, 'Pleae enter a valid email']
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

//Mongoose Hoonks post('save', function(doc, next)) -> fire a function after user saved to DB
//Mongoose Hoonks pre -> fire a function before user saved to DB
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    //this refers to the instance of the user we're trying to create
    //!!!instance is one particular copy of a thing!!!
    this.password = await bcrypt.hash(this.password, salt);
    //go to the next middleware, "If you don't use it, the code will crash."
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password){
    const user= await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

// the first parameter of the model must be the singular of the collection name
module.exports = mongoose.model("user", userSchema);