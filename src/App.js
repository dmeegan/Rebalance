import React from 'react';
import Portfolio from './components/Portfolio';
import Stock from './components/Stock';
// import AcceptUserStockSymbol from './acceptUserStockSymbol.js';
import './App.css';
// import FetchStockSymbol from './fetchStockSymbol.js';


class App extends React.Component {
  state = {
    portfolio: [{
      id: '1',
      symbol: "MSFT",
      currentPrice: '153',
      quantity: '',
      marketValue: '',
      currentPercentage: '',
      targetPercentage: '',
      targetValue:'',
      addedValue:'',
      sellOrPurchase:'',
      costOrValue:'',
    },
    ]
  }

   getQuantity = (id, event) => {
    this.setState({ portfolio: this.state.portfolio.map(stock => {
      if (stock.id === id) {
        stock["quantity"] = event.target.value;
      }
      return stock;
    })});
  }


  delStock = (id) => {
    this.setState({ portfolio: [...this.state.portfolio.filter(portfolio => portfolio.id !== id)] }
    )
  }

  

  render() {
    return (
      <div className="App">
        <Portfolio getQuantity={this.getQuantity} delStock={this.delStock} portfolio={this.state.portfolio} />
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