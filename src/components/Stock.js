import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Stock extends Component {

    render() {

       const stock = this.props.stock;

        return (
            <tbody>
            <tr>
                <td>
                    {stock.symbol} 
                </td>
                <td>
                    <input type="number" min="0" className="table input" id="quantityInput" onChange={this.props.getQuantity.bind(this, id)}/>
                </td>
                <td>
                    <output className="table output" id="currentPriceOutput">{stock.currentPrice}</output>
                </td>
                <td>
                    <output className="table output" id="marketValueOutput">{stock.marketValue}</output>
                </td>
                <td>
                    <output className="table output" id="currentPercentageOutput">{stock.currentPercentage}</output>
                </td>
                <td>
                    <input type="number" min="0" max="100" className="table input" id="targetPercentageInput" />
                </td>
                <td>
                    <output className="table output" id="targetValueOutput">{stock.targetPercentage}</output>
                </td>
                <td>
                    <output className="table output" id="addedValueOutput">{stock.addedValue}</output>
                </td>
                <td>
                    <output className="table output" id="sellOrPurchaseOutput">{stock.sellOrPurchase}</output>
                </td>
                <td>
                    <output className="table output" id="costOrValueOutput">{stock.costOrValue}</output>
                </td>
            </tr>
        </tbody>
        )
    }
}

Stock.propTypes = {
    stock: PropTypes.object.isRequired
}

export default Stock;
