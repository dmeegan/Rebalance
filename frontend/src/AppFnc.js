import React, { useState } from 'react';
import Portfolio from './components/Portfolio';
import AddStock from './components/AddStockFnc';
import TopNav from './components/TopNav';
import SignIn from './components/SignIn';
import Register from './components/Register';
import { GlobalProvider } from './context/GlobalContext';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
// import AcceptUserStockSymbol from './acceptUserStockSymbol.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import FetchStockSymbol from './fetchStockSymbol.js';


export default function App() {

 

  // addStock = (userSymbolInput) => {
  //   let newPortfolioItem = {};
  //   let newId = this.state.portfolio.length + 1
  //   let API_Key = process.env.API_Key;
  //   let Search_API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userSymbolInput}&apikey=${API_Key}`;


  //   fetch(Search_API_Call)
  //     .then(
  //       (searchResponse) => {
  //         return searchResponse.json();
  //       }
  //     )
  //     .then(
  //       (searchData) => {
  //         // eslint-disable-next-line no-undef
  //         return stockToAdd = searchData["bestMatches"][0];
  //       }
  //     )
  //     .then(
  //       (stockToAdd) => {
  //         let Quote_API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockToAdd["1. symbol"]}&interval=5min&apikey=${API_Key}&outputsize=compact`;
  //         fetch(Quote_API_Call)
  //           .then(
  //             (quoteResponse) => {
  //               return quoteResponse.json();
  //             }
  //           )
  //           .then(
  //             (quoteData) => {
  //               // eslint-disable-next-line no-undef
  //               return currentPrice = +(quoteData["Global Quote"]["05. price"]);
  //             })
  //           .then(
  //             (currentPrice) => {
  //               newPortfolioItem = {
  //                 id: newId,
  //                 symbol: stockToAdd["1. symbol"],
  //                 name: stockToAdd["2. name"],
  //                 currentPrice: currentPrice.toFixed(2),
  //                 quantity: 0,
  //                 targetPercentage: 0
  //               };
  //               this.setState({ portfolio: [...this.state.portfolio, newPortfolioItem] });
  //             }
  //           ).catch(
  //             () => alert("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
  //           )
  //       }
  //     )
  //     .catch(
  //       () => alert("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
  //     )
  // }

 const delStock = (id) => {
    let currentStock = state.portfolio.find(portfolio => portfolio.id === id)
    let currentMarketValue = (currentStock.currentPrice * currentStock.quantity).toFixed(2)
    setState({
      currentTotalAssets: state.currentTotalAssets - currentMarketValue,
      newTotalAssets: state.newTotalAssets - currentMarketValue,
      portfolio: state.portfolio.filter(stock => stock.id !== id)
  })};

 const getQuantity = (id, e) => {
    let assetsAccumulator = 0;
    let userQuantityInput = +e.target.value;
    if (userQuantityInput < 0) {
      userQuantityInput = 0;
    }
    setState({ currentTotalAssets: '' });
    setState({
      portfolio: state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["quantity"] = +userQuantityInput;
        };
        assetsAccumulator += (stock.currentPrice * stock.quantity);
        return stock;
      }),
      currentTotalAssets: +assetsAccumulator.toFixed(2),
      newTotalAssets: (state.addedAssets + assetsAccumulator).toFixed(2)
    })
  }

  const handleTargetPercentageInput = (id, e) => {
    let userPercentageInput = +(e.target.value);
    if (userPercentageInput > 100) {
      userPercentageInput = 100
    } else if (userPercentageInput < 0) {
      userPercentageInput = 0
    }
    setState({
      portfolio: state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["targetPercentage"] = userPercentageInput;
        };
        return stock;
      })
    })
  }

  const handleAddedAssetsInput = (e) => {
    let userAddedAssetsInput = +e.target.value;
    if (userAddedAssetsInput < 0) {
      userAddedAssetsInput = 0
    }
    setState({
      addedAssets: userAddedAssetsInput,
      newTotalAssets: +state.currentTotalAssets + userAddedAssetsInput
    })
  }

  return (
    <div className="App">
      <Router>
        <TopNav />
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <UserContext.Provider>
          <Route path="/Rebalance">
            <AddStock />
            <Portfolio
              getQuantity={getQuantity}
              currentTotalAssets={state.currentTotalAssets}
              addedAssets={state.addedAssets}
              newTotalAssets={state.newTotalAssets}
              delStock={delStock}
              portfolio={state.portfolio}
              handleTargetPercentageInput={handleTargetPercentageInput}
              handleAddedAssetsInput={handleAddedAssetsInput}
            />
          </Route>
        </UserContext.Provider>
      </Router>
    </div>
  )
};