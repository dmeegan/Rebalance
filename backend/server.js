const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const { check, validationResult } = require('express-validator');
const { response } = require("express");
const dbServices = require('./dbservice');
const cors = require('cors');
const fetch = require('node-fetch');

const db = dbServices.getDbServiceInstance();


dotenv.config({path: './.env'});

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//registerUser
app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const result = db.registerUser(first_name, last_name, email, password);

    result
    .then(data => res.json({ success: true }))
    .catch(err => console.log(err))
});

//registerUser with email validation using express-validator

// app.post('/api/register', 
// check('email').isEmail().normalizeEmail(), (req, res) => {
//     const errors =  validationResult(req);
//     if (!errors.isEmpty(errors)) {
//         return res.status(422).json({errors: errors.array()
//         })
//     }

//     const result = db.resisterUser(first_name, last_name, email, password);

//     result
//     .then(data => response.json({ success: true }))
//     .catch(err => console.log(err))
// })

//read
app.get('/getPortfolio', (req, res) => {
    dbServices.get
    res.json({
        success: true
    });
});

//auth0 specific

// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//   })
// );

//addStock
app.post('/addstock', (req, res) => {
    const { symbolToFetch, currentPortfolioLength } = req.body;
    let newId = currentPortfolioLength + 1;
    let API_KEY = process.env.API_KEY;
    let Search_API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbolToFetch}&apikey=${API_KEY}`;
    fetch(Search_API_Call)
      .then(
        (searchResponse) => {
          return searchResponse.json();
        }
      )
      .then(
        (searchData) => {
          return stockToAdd = searchData["bestMatches"][0];
        }
      )
      .then(
        (stockToAdd) => {
          let Quote_API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockToAdd["1. symbol"]}&interval=5min&apikey=${API_KEY}&outputsize=compact`;
          fetch(Quote_API_Call)
            .then(
              (quoteResponse) => {
                return quoteResponse.json();
              }
            )
            .then(
              (quoteData) => {
                return currentPrice = +(quoteData["Global Quote"]["05. price"]);
              })
            .then(
              (currentPrice) => {
                newPortfolioItem = {
                  id: newId,
                  symbol: stockToAdd["1. symbol"],
                  name: stockToAdd["2. name"],
                  currentPrice: currentPrice.toFixed(2),
                  quantity: 0,
                  targetPercentage: 0
                };
                res.send(newPortfolioItem);
              }
            ).catch(
              () => res.status(500).end("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
            )
        }
      )
      .catch(
        () => res.status(500).end("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
      )
  });

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// })



app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});