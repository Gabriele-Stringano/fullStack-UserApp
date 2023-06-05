const express = require('express');
const mongoose = require('mongoose')
const helmet = require("helmet");
const connectionDB = require("./database");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express()

// Middlewares
// Express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
// Cookie-parser is a middleware which parses cookies attached to the client request object.
app.use(cookieParser());

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Mongoose will wrap any objects in the query filter with MongoDB's $eq query operator, which blocks query selector injections
mongoose.set('sanitizeFilter', true);
mongoose.trusted


// Routes
app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Home" });
});

app.use('/api', authRoutes);


// Error 404
app.get("*", (req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

// Connection to DB e server run
connectionDB().then((result) => app.listen(process.env.PORT || 5000, () => console.log('server up')))
    .catch(err => console.log('connection error' + err))