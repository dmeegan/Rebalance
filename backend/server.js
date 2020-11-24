const mysql = require("mysql");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { auth } = require('express-openid-connect');
const { check, validationResult } = require('express-validator');

dotenv.config({path: './config.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.post('/api/register', 
[check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 8})
], (req, res) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty(errors)) {
        return res.status(422).json({errors: errors.array()
        })
    }

    console.log(errors);
    console.log(req.body);
})

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((err)=> {
    if(!err){
        console.log("Connected");
    } else {
        console.log("Connection failed");
    }
});

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});