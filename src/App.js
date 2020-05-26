import React from 'react';
import Portfolio from './components/Portfolio';
import AddStock from './components/AddStock';
// import AcceptUserStockSymbol from './acceptUserStockSymbol.js';
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
    let symbolToAdd = '';
    let currentPrice = '';
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
          return symbolToAdd = searchData["bestMatches"][0]["1. symbol"];
        }
      )
      .then(
        (symbolToAdd) => {
          let Quote_API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbolToAdd}&interval=5min&apikey=${API_Key}&outputsize=compact`;

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
                  symbol: symbolToAdd,
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
            )
        }
      )
  }

  delStock = (id) => {
    let currentTotalAssets = 0;
    this.setState({
      totalAssets: this.state.totalAssets - this.state.portfolio.find( portfolio => portfolio.id === id).marketValue,
      portfolio: [...this.state.portfolio.filter(portfolio => portfolio.id !== id)].map(stock => {
        if (stock.id != id) {
        currentTotalAssets += stock.marketValue;
        stock["currentPercentage"] = (100 * (stock.marketValue / currentTotalAssets)).toFixed(2);
        } 
        return stock;
      })
    }
    )
  }

  // totalAssets: this.state.totalAssets - this.state.portfolio[this.state.portfolio.indexOf(id)].marketValue,

  getQuantity = (id, e) => {
    let currentTotalAssets = 0;
    this.setState({ totalAssets: '' });
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["quantity"] = +e.target.value;
          stock["marketValue"] = ((stock.quantity) * (stock.currentPrice)).toFixed(2)
        };
        currentTotalAssets += +stock.marketValue;
        this.state.portfolio.map(stock => {
          stock["currentPercentage"] = (100 * (stock.marketValue / currentTotalAssets)).toFixed(2);
        })
        return stock;
      }),
      totalAssets: currentTotalAssets
    })
  }

  calculateCurrentPercentage = (id) =>  {
    console.log(this.state.totalAssets)
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["currentPercentage"] = (stock.marketValue / this.state.totalAssets).toFixed(2)
        }
        return stock;
      })
    }
    )
  }

  handleTargetPercentageInput = (id, e) => {
    let userPercentageInput = +(e.target.value, 2).toFixed(2);
    if (userPercentageInput > 100) {
      userPercentageInput = 100
    } else if (userPercentageInput < 0) {
      userPercentageInput = 0
    }
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["targetPercentage"] = +userPercentageInput;
          stock["targetValue"] = ((stock.targetPercentage / 100) * (this.state.totalAssets)).toFixed(2);
          stock["addedValue"] = +(stock.targetValue - stock.marketValue).toFixed(2);
          stock["sellOrPurchase"] = Math.floor((+stock.targetValue) / (+stock.currentPrice));
        };
        return stock;
      })
    })
  }

  calculateTargetValue = (id) => {
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["targetValue"] = stock.targetPercentage * this.state.totalAssets
        }
        return stock;
      })
    }
    )
  }

  // calculateAddedValue = () => {}

  calculateSellOrPurchase = (id) => {
    this.setState({
      portfolio: this.state.portfolio.map(stock => {
        if (stock.id === id) {
          stock["sellOrPurchase"] = Math.floor((stock.targetPercentage * this.state.totalAssets))
        }
        return stock;
      })
    }
    )
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