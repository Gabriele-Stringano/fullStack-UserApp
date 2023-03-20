const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
//const helmet = require("helmet");
const connectionDB = require("./database");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const app = express()

//middlewares
//express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use(cookieParser());

//Helmet helps you secure your Express apps by setting various HTTP headers
//app.use(helmet());

//Mongoose will wrap any objects in the query filter with MongoDB's $eq query operator, which blocks query selector injections
//mongoose.set('sanitizeFilter', true);
//mongoose.trusted

app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Home" });
});

app.post('/dashboard', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403)
        }
        else {
            res.json({
                message: 'success...',
                //authData sono le informazioni di user, comode da salvare in redux
                authData
            })
        }
    })
})


app.use('/api', authRoutes);

// error 404
app.get("*", (req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});


//verifyToken Function
function verifyToken(req, res, next) {

    //get auth header value, nell'header passo la key e devo impostare la richiesta su ['authorization']
    const bearerHeader = req.header['authorization']
    //Check if is undefined, in questo bearer ho passato la key
    if (typeof bearerHeader !== 'undefined') {
        //split the space, dato che passo una stringa chiamata Bearer <access_token> a me interessa solo il token
        const bearer = bearerHeader.split(' ');
        //Get token
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        next();
    } else {
        //forbiddden
        res.sandStatus(403);
    }
}


connectionDB().then((result) => app.listen(process.env.PORT || 5000, () => console.log('server up')))
    .catch(err => console.log('connection error' + err))