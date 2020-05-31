import React from 'react';
import Portfolio from './components/Portfolio';
import AddStock from './components/AddStock';
// import AcceptUserStockSymbol from './acceptUserStockSymbol.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import FetchStockSymbol from './fetchStockSymbol.js';


class App extends React.Component {
  state = {
    totalAssets: '',
    portfolio: [
      //   {
      //   id: '1',
      //   symbol: "MSFT",
      //   currentPrice: '153',
      //   quantity: '',
      //   marketValue: '',
      //   currentPercentage: '',
      //   targetPercentage: '',
      //   targetValue: '',
      //   addedValue: '',
      //   sellOrPurchase: '',
      //   costOrValue: '',
      // },
    ]
  }

  addStock = (userSymbolInput) => {
    let newPortfolioItem = {};
    let stockToAdd = '';
    let currentPrice = '';
    let stockTitle = '';
    let newId = this.state.portfolio.length + 1
    let API_Key = 'WTIDRPP8PEFL74TS';
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
                  quantity: '',
                  marketValue: '',
                  currentPercentage: '',
                  targetPercentage: '',
                  targetValue: '',
                  addedValue: '',
                  sellOrPurchase: '',
                  costOrValue: '',
                };
                this.setState({ portfolio: [...this.state.portfolio, newPortfolioItem] });
              }
            ).catch ( 
              () => alert("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
            )
        }
      )
      .catch ( 
        () => alert("Error: Either your search term was invalid, or the request to add a stock was too frequent. Please try again.")
      )
  }

  delStock = (id) => {
    let currentTotalAssets = 0;
    this.setState({
      totalAssets: this.state.totalAssets - this.state.portfolio.find(portfolio => portfolio.id === id).marketValue,
      portfolio: [...this.state.portfolio.filter(portfolio => portfolio.id !== id)].map(stock => {
        if (stock.id !== id) {
          currentTotalAssets += stock.marketValue;
          stock["currentPercentage"] = (100 * (stock.marketValue / currentTotalAssets)).toFixed(2);
        }
        return stock;
      })
    }
    )
  }

  getQuantity = (id, e) => {
    let currentTotalAssets = 0;
    let userQuantityInput = +e.target.value;
    if (userQuantityInput < 0) {
      userQuantityInput = 0;
    }
    this.setState({ totalAssets: '' });
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["quantity"] = +userQuantityInput;
          stock["marketValue"] = ((stock.quantity) * (stock.currentPrice)).toFixed(2)
          stock["targetValue"] = ((stock.targetPercentage / 100) * (this.state.totalAssets)).toFixed(2);
          stock["addedValue"] = +(stock.targetValue - stock.marketValue).toFixed(2);
          stock["sellOrPurchase"] = Math.floor((stock.targetValue - stock.marketValue) / (+stock.currentPrice));
          stock["costOrValue"] = (-1* stock.sellOrPurchase * stock.currentPrice).toFixed(2);
        };
        currentTotalAssets += +stock.marketValue;
        this.state.portfolio.map(stock => {
          stock["currentPercentage"] = +(100 * (+stock.marketValue / currentTotalAssets)).toFixed(2) || 0;
          stock["targetValue"] = ((stock.targetPercentage / 100) * (this.state.totalAssets)).toFixed(2);
          stock["addedValue"] = +(stock.targetValue - stock.marketValue).toFixed(2);
          stock["sellOrPurchase"] = Math.floor((stock.targetValue - stock.marketValue) / (+stock.currentPrice));
          stock["costOrValue"] = (-1* stock.sellOrPurchase * stock.currentPrice).toFixed(2);
        })
        return stock;
      }),
      totalAssets: currentTotalAssets.toFixed(2),
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
          stock["targetValue"] = ((stock.targetPercentage / 100) * (this.state.totalAssets)).toFixed(2);
          stock["addedValue"] = +(stock.targetValue - stock.marketValue).toFixed(2);
          stock["sellOrPurchase"] = Math.floor((stock.targetValue - stock.marketValue) / (+stock.currentPrice));
          stock["costOrValue"] = (-1* stock.sellOrPurchase * stock.currentPrice).toFixed(2);
        };
        return stock;
      })
    })
  }

  render() {
    return (
      <div className="App">
        <AddStock addStock={this.addStock} />
        <Portfolio
          getQuantity={this.getQuantity}
          delStock={this.delStock}
          totalAssets={this.state.totalAssets}
          portfolio={this.state.portfolio}
          calculateMarketValue={this.calculateMarketValue}
          calculateTotalAssets={this.calculateTotalAssets}
          calculateCurrentPercentage={this.calculateCurrentPercentage}
          handleTargetPercentageInput={this.handleTargetPercentageInput}
          calculateTargetValue={this.calculateTargetValue}
          calculateSellOrPurchase={this.calculateSellOrPurchase}
        />
      </div>

      /* <div className="rebalance table container">
                      <table className="table">
                          <thead>
                              <tr>
                                  <th>
                                      Symbol
                  </th>
                                  <th>
                                      Quantity
                  </th>
                                  <th>
                                      Current Price
                  </th>
                                  <th>
                                      Market Value
                  </th>
                                  <th>
                                      Current Percentage
                  </th>
                                  <th>
                                      Target Percentage
                  </th>
                                  <th>
                                      Target Value
                  </th>
                                  <th>
                                      Added Value
                  </th>
                                  <th>
                                      Sell or Purchase
                  </th>
                                  <th>
                                      Cost or Value
                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>
                                      <output className="table output" id="symbolOutput" value={this.props.portfolio.stock.bind(
                                          this, id)}/>
                                  </td>
                                  <td>
                                      <input type="number" min="0" className="table input" id="quantityInput" />
                                  </td>
                                  <td>
                                      <output className="table output" id="currentPriceOutput" />
                                  </td>
                                  <td>
                                      <output className="table output" id="currentPercentageOutput" />
                                  </td>
                                  <td>
                                      <input type="number" min="0" max="100" className="table input" id="targetPercentageInput" />
                                  </td>
                                  <td>
                                      <output className="table output" id="targetValueOutput" />
                                  </td>
                                  <td>
                                      <output className="table output" id="addedValueOutput" />
                                  </td>
                                  <td>
                                      <output className="table output" id="sellOrPurchaseOutput" />
                                  </td>
                                  <td>
                                      <output className="table output" id="costOrValueOutput" />
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div> */
      //   <div className="Totals Table container">
      //     <table className="table">
      //       <tbody>
      //         <tr>
      //           <th>
      //             Current Total
      //           </th>
      //           <td>
      //             <output className="table output" id="currentTotalOutput" />
      //           </td>
      //         </tr>
      //         <tr>
      //           <th>
      //             Added Value
      //           </th>
      //           <td>
      //             <input type="number" min="0" className="table input" id="totalAddedValueInput" />
      //           </td>
      //         </tr>
      //       </tbody>
      //       <tbody>
      //         <tr>
      //           <th>
      //             New Total
      //           </th>
      //           <td>
      //             <output className="table output" id="newTotalOutput" />
      //           </td>
      //         </tr>
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
    )
  }
}

export default App;