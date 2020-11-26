import React from 'react';
import Portfolio from './components/Portfolio';
import AddStock from './components/AddStock';
import TopNav from './components/TopNav';
import SignIn from './components/SignIn';
import Register from './components/Register';
import dotenv from 'dotenv';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
// import AcceptUserStockSymbol from './acceptUserStockSymbol.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import FetchStockSymbol from './fetchStockSymbol.js';

dotenv.config({ path: '../../backend/.env' });

class App extends React.Component {
  state = {
    currentTotalAssets: 0,
    portfolio: [
    ],
    addedAssets: 0,
    newTotalAssets: 0
  }

  addStock = (userSymbolInput) => {
    // eslint-disable-next-line no-unused-vars
    let stockToAdd = '';
    // eslint-disable-next-line no-unused-vars
    let currentPrice = '';
    let newPortfolioItem = {};
    let newId = this.state.portfolio.length + 1
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
                this.setState({ portfolio: [...this.state.portfolio, newPortfolioItem] });
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

  delStock = (id) => {
    let currentStock = this.state.portfolio.find(portfolio => portfolio.id === id)
    let currentMarketValue = (currentStock.currentPrice * currentStock.quantity).toFixed(2)
    this.setState({
      currentTotalAssets: this.state.currentTotalAssets - currentMarketValue,
      newTotalAssets: this.state.newTotalAssets - currentMarketValue,
      portfolio: this.state.portfolio.filter(stock => stock.id !== id)
    })
  }

  getQuantity = (id, e) => {
    let assetsAccumulator = 0;
    let userQuantityInput = +e.target.value;
    if (userQuantityInput < 0) {
      userQuantityInput = 0;
    }
    this.setState({ currentTotalAssets: '' });
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["quantity"] = +userQuantityInput;
        };
        assetsAccumulator += (stock.currentPrice * stock.quantity);
        return stock;
      }),
      currentTotalAssets: +assetsAccumulator.toFixed(2),
      newTotalAssets: (this.state.addedAssets + assetsAccumulator).toFixed(2)
    })
  }

  handleTargetPercentageInput = (id, e) => {
    let userPercentageInput = +(e.target.value);
    if (userPercentageInput > 100) {
      userPercentageInput = 100
    } else if (userPercentageInput < 0) {
      userPercentageInput = 0
    }
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["targetPercentage"] = userPercentageInput;
        };
        return stock;
      })
    })
  }

  handleAddedAssetsInput = (e) => {
    let userAddedAssetsInput = +e.target.value;
    if (userAddedAssetsInput < 0) {
      userAddedAssetsInput = 0
    }
    console.log(this.state.currentTotalAssets)
    console.log(userAddedAssetsInput)
    this.setState({
      addedAssets: userAddedAssetsInput,
      newTotalAssets: +this.state.currentTotalAssets + userAddedAssetsInput
    })
  }

  render() {
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
          <Route path="/Rebalance">
            <AddStock addStock={this.addStock} />
            <Portfolio
              getQuantity={this.getQuantity}
              currentTotalAssets={this.state.currentTotalAssets}
              addedAssets={this.state.addedAssets}
              newTotalAssets={this.state.newTotalAssets}
              delStock={this.delStock}
              portfolio={this.state.portfolio}
              calculateMarketValue={this.calculateMarketValue}
              calculateTotalAssets={this.calculateTotalAssets}
              calculateCurrentPercentage={this.calculateCurrentPercentage}
              handleTargetPercentageInput={this.handleTargetPercentageInput}
              calculateTargetValue={this.calculateTargetValue}
              calculateSellOrPurchase={this.calculateSellOrPurchase}
              handleAddedAssetsInput={this.handleAddedAssetsInput}
            />
          </Route>
        </Router>
      </div>
    )
  }
}

export default App;