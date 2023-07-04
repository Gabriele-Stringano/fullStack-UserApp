const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const { validateUserRules } = require('../validators/user')
const bcrypt = require('bcrypt');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'email not registered'
  }
  //incorrect password
  if (err.message === 'incorrect password') {
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
};

const maxAge = 3 * 24 * 60 * 60;

//creating token JWT
const createToken = (id) => {
  //id is the payload, the string is the secret
  return jwt.sign({ id }, process.env.HASHING_STRING, {
    expiresIn: maxAge
  })
};

module.exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword, username });
    //token creation
    const token = createToken(user._id);
    //cookie creation e sending to browser
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', secure: true });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({ user: user._id });
      } else {
        throw new Error('incorrect password');
      }
    } else {
      throw new Error('incorrect email');
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1, httpOnly: true, sameSite: 'none', secure: true });
  res.status(200).json({ result: 'logged out' });
}

module.exports.update_user = async (req, res) => {
  const { error, value } = validateUserRules(req.body);

  if (error) {
    console.log(error);
    return res.status(422).json({ message: error.details });
  }

  try {
    const currentUser = req.user;
    const userId = req.params.userId;

    if (currentUser !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedFields = {};

    if (req.body.username) {
      updatedFields.username = req.body.username;
    }
    if (req.body.email) {
      updatedFields.email = req.body.email;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.updateOne({ _id: userId }, { $set: updatedFields });
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

module.exports.userById = async (req, res) => {
  const currentUser = req.user;
  const userId = req.params.userId;

  if (currentUser !== userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) throw "not found";
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

module.exports.isAutenticated_get = async (req, res) => {
  let result = { authorised: false };
  //grab the token form the browser (client)
  const token = req.cookies.jwt;
  console.log(token);
  //check if the token was grabbed
  if (token) {
    jwt.verify(token, process.env.HASHING_STRING, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ result });
      } else {
        result.authorised = true;
        res.status(200).json({ result });
      }
    });
  } else {
    res.status(400).json({ result });
  }
};