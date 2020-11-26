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