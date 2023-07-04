const express = require('express');
const mongoose = require('mongoose')
const helmet = require("helmet");
const connectionDB = require("./database");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cors = require('cors')
const jwt = require('jsonwebtoken');

const app = express()

// Middlewares
// Express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
// Cookie-parser is a middleware which parses cookies attached to the client request object.
app.use(cookieParser());

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

app.use(
    cors({
        origin: "https://autentication.gabrielestringano.com",
        credentials: true,
    })
)

// Mongoose will wrap any objects in the query filter with MongoDB's $eq query operator, which blocks query selector injections
mongoose.set('sanitizeFilter', true);
mongoose.trusted

const getIdFromJwt = (req, res, next) => {
  const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    jwt.verify(token, process.env.HASHING_STRING, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      req.user = decodedToken.id;
      next();
    });
}

// Routes
app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Home" });
});

app.use('/api/auth', authRoutes);

app.use('/api/users', getIdFromJwt, usersRoutes);

// Error 404
app.get("*", (req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

// Connection to DB e server run
connectionDB().then((result) => app.listen(process.env.PORT || 5000, () => console.log('server up')))
    .catch(err => console.log('connection error' + err))