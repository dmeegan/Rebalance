import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl} from 'react-bootstrap';

class Stock extends Component {
   

    render() {
      
    const {id, symbol, name, currentPrice, marketValue, currentPercentage, targetPercentage, targetValue, addedValue, sellOrPurchase, costOrValue} = this.props.stock;
        return (
            <tr>
                <td>
                    <Button variant="primary" type="button" className="removeStockButton" onClick={this.props.delStock.bind(this, id)}>Remove</Button>
                </td>
                <td>
                    {symbol}
                </td>
                <td>
                    {name}
                </td>
                <td>
                    <FormControl type="number" min="0" className="table input" onChange={this.props.getQuantity.bind(this, id)}/>
                </td>
                <td>
                    {currentPrice}
                </td>
                <td>
                    {marketValue}
                </td>
                <td>
                    {currentPercentage}
                </td>
                <td>
                    <FormControl type="number" min="0" max="100" className="input" id="targetPercentageInput" onChange={this.props.handleTargetPercentageInput.bind(this, id)}/>
                </td>
                <td>
                    {targetValue}
                </td>
                <td>
                    {addedValue}
                </td>
                <td>
                    {sellOrPurchase}
                </td>
                <td>
                    {costOrValue}
                </td>
            </tr>
        )
    }
}

Stock.propTypes = {
    stock: PropTypes.object.isRequired
}

export default Stock;
