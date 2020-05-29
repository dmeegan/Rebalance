import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Stock extends Component {
   

    render() {
      
    const {id, symbol, name, currentPrice, marketValue, currentPercentage, targetPercentage, targetValue, addedValue, sellOrPurchase, costOrValue} = this.props.stock;
        return (
            <tr>
                <td>
                    <button type="button" className="removeStockButton" onClick={this.props.delStock.bind(this, id)}>Remove Stock</button>
                </td>
                <td>
                    <output className="table output" id="symbolOutput">{symbol}</output>
                </td>
                <td>
                    <output className="table output" id="stockNameOutput">{name}</output>
                </td>
                <td>
                    <input type="number" min="0" className="table input" onChange={this.props.getQuantity.bind(this, id)}/>
                </td>
                <td>
                    <output className="table output" id="currentPriceOutput">{currentPrice}</output>
                </td>
                <td>
                    <output className="table output" id="marketValueOutput">{marketValue}</output>
                </td>
                <td>
                    <output className="table output" id="currentPercentageOutput">{currentPercentage}</output>
                </td>
                <td>
                    <input type="number" min="0" max="100" className="table input" id="targetPercentageInput" onChange={this.props.handleTargetPercentageInput.bind(this, id)}/>
                </td>
                <td>
                    <output className="table output" id="targetValueOutput">{targetValue}</output>
                </td>
                <td>
                    <output className="table output" id="addedValueOutput">{addedValue}</output>
                </td>
                <td>
                    <output className="table output" id="sellOrPurchaseOutput">{sellOrPurchase}</output>
                </td>
                <td>
                    <output className="table output" id="costOrValueOutput">{costOrValue}</output>
                </td>
            </tr>
        )
    }
}

Stock.propTypes = {
    stock: PropTypes.object.isRequired
}

export default Stock;
