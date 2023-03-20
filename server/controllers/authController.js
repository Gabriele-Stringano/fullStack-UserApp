const User = require('../models/users');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge= 3* 24 *60 * 60;

//creating token JWT
const createToken = (id) => {
    //id is the payload, the string is the secret
    return jwt.sign({ id }, 'f_w3fwvapc jodf!cj_3sgg', {
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        //token creation
        const token = createToken(user._id);
        //cookie creation e sending to browser
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
        res.status(201).json({ user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.login_post = async (req, res) => {
    res.send('new login')
}