import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

export default function Stock({ stock }) {

    const {portfolio, currentTotalAssets, addedAssets, newTotalAssets, delStock} = useContext(GlobalContext);
    const { id, symbol, name, currentPrice, quantity, targetPercentage } = stock;
    // const {currentTotalAssets, delStock, getQuantity, newTotalAssets} = this.props

    const marketValue = (currentPrice * quantity).toFixed(2);
    const currentPercentage = currentTotalAssets > 0 ? ((100 * (marketValue / currentTotalAssets)).toFixed(2)) : 0;
    const targetValue = newTotalAssets > 0 ? (((targetPercentage / 100) * (newTotalAssets)).toFixed(2)) : 0;
    const addedValue = newTotalAssets > 0 ? ((targetValue - marketValue).toFixed(2)) : 0;
    const sellOrPurchase = (addedValue > 0 ? Math.floor((addedValue) / (currentPrice)) : Math.ceil((addedValue) / (currentPrice)));
    const costOrValue = ((sellOrPurchase * currentPrice).toFixed(2));

    return (
        <tr>
            <td>
                <Button variant="primary" type="button" className="removeStockButton" onClick={() => delStock(id)}>Remove</Button>
            </td>
            <td>
                {symbol}
            </td>
            <td>
                {name}
            </td>
            <td>
                {/* <FormControl type="number" min="0" className="tableInput" value={quantity} onChange={getQuantity.bind(this, id)} /> */}
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
                {/* <FormControl type="number" min="0" max="100" className="input" step="0.01" id="targetPercentageInput" value={targetPercentage} onChange={handleTargetPercentageInput.bind(this, id)} /> */}
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