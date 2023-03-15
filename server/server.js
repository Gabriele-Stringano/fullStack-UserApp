const express = require('express');
const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose')
//const helmet = require("helmet");
//const connectionDB = require("./database");

const app = express()

//express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())

//Helmet helps you secure your Express apps by setting various HTTP headers
//app.use(helmet());

//Mongoose will wrap any objects in the query filter with MongoDB's $eq query operator, which blocks query selector injections
//mongoose.set('sanitizeFilter', true);
//mongoose.trusted

app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Hi fam" });
});

app.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.status(403)
        }
        else{
            res.json({
                message: 'success...',
                //authData sono le informazioni di user, comode da salvare in redux
                authData
            })
        }
    })
})

app.post('/login', (req, res) => {

    //devi preparare il processo di autenticazione che restituisce poi l'user
    const user = {
        id: 1,
        username: 'bob',
        email: 'dkcv'
    }

    //in caso di successo provvediamo con la creazione del token che va salvato in un LOCAL STORE
    const key = jwt.sign({ user: user }, 'secretkey', {expiresIn: '1h'}, (err, token) => {
        res.json({
            token
        })
    });
});

// error 404
app.get("*", (req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

//FORMAT TOKEN

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

app.listen(5000, () => { console.log('server started') })
/*connectionDB().then((result) => app.listen(process.env.PORT || 5000 , () => console.log ('server up')))
.catch(err => console.log('connection error' + err))*/