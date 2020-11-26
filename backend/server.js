const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const { check, validationResult } = require('express-validator');
const { response } = require("express");
const dbServices = require('./dbservice');

const db = dbServices.getDbServiceInstance();


dotenv.config({path: './.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//registerUser
app.post('/register', (req, res) => {
    const { first_name, last_name, email, password } = req.body;
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
app.get('./getPortfolio', (req, res) => {
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

app.post('./addStock'), (req, res) => {
    const { userSymbolInput, currentPortfolioLength } = req.body;
    let newPortfolioItem = {};
    let newId = currentPortfolioLength + 1;
    let API_Key = process.env.API_Key;
    let Search_API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userSymbolInput}&apikey=${API_Key}`;


    fetch(Search_API_Call)
      .then(
        (searchResponse) => {
          return searchResponse.json();
        }
      )
      .then(
        (searchData) => {
          // eslint-disable-next-line no-undef
          return stockToAdd = searchData["bestMatches"][0];
        }
      )
      .then(
        (stockToAdd) => {
          let Quote_API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockToAdd["1. symbol"]}&interval=5min&apikey=${API_Key}&outputsize=compact`;
          fetch(Quote_API_Call)
            .then(
              (quoteResponse) => {
                return quoteResponse.json();
              }
            )
            .then(
              (quoteData) => {
                // eslint-disable-next-line no-undef
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
                return newPortfolioItem;
              }
            ).catch(
              () => alert("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
            )
        }
      )
      .catch(
        () => alert("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
      )
  }

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// })



app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});