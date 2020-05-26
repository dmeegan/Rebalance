import React, { Component } from 'react';
import Stock from './Stock';
import PropTypes from 'prop-types';


class Portfolio extends Component {

    render() {
        if (this.props.portfolio.length > 0) {
        return (
            <div>
            <table className="stockTable">
                         <thead><tr><th></th><th>Symbol</th><th>Quantity</th><th>Current Price</th><th>Market Value</th><th>Current Percentage</th><th>Target Percentage</th><th>Target Value</th><th>Added Value</th><th>Sell or Purchase</th><th>Cost or Value</th></tr></thead>
            <tbody>
                {
                this.props.portfolio.map((stock) => (
                <Stock
                    key={stock.id}
                    getQuantity={this.props.getQuantity}
                    delStock={this.props.delStock}
                    totalAssets={this.props.totalAssets}
                    stock={stock}
                    calculateMarketValue={this.props.calculateMarketValue}
                    calculateTotalAssets={this.props.calculateTotalAssets}
                    calculateCurrentPercentage={this.props.calculateCurrentPercentage}
                    handleTargetPercentageInput={this.props.handleTargetPercentageInput}
                    calculateTargetValue={this.props.calculateTargetValue}
                    calculateSellOrPurchase={this.props.calculateSellOrPurchase}
                />
            )) }
            </tbody> 
            </table>
            </div>
        )
    } else {
        return null;
    }
}
}

Portfolio.propTypes = {
    portfolio: PropTypes.array.isRequired
}

export default Portfolio;
