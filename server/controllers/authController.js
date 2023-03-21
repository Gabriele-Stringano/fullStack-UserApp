const User = require('../models/users');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'email not registered'
    }
      //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'wrong password'
    }

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

const maxAge = 3 * 24 * 60 * 60;

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
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        //User.login is a static method created in models/users.js
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.requireAuth_get = async (req, res) => {
    let result= {error: '', token: ''};
    //grab the token form the browser (client)
    const token = req.cookies.jwt;
    //check if the token was grabbed
    if (token) {
        jwt.verify(token, 'f_w3fwvapc jodf!cj_3sgg', (err, decodedToken) => {
          if (err) {
            result.error= err;
            res.status(400).json({result});
          } else {
            result.token= token;
            res.status(200).json({result});
          }
        });
      } else {
        result.error= 'token jwt not found';
        res.status(400).json({result});
      }
    };
