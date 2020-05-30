import React, { Component } from 'react';
import Stock from './Stock';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';


class Portfolio extends Component {

    render() {
        if (this.props.portfolio.length > 0) {
        return (
            <div>
            <Table striped bordered hover variant="dark">
                         <thead><tr><th scope="col"></th><th scope="col">Symbol</th><th scope="col">Stock Name</th><th scope="col">Quantity</th><th scope="col">Current Price</th><th scope="col">Market Value</th><th scope="col">Current Percentage</th><th scope="col">Target Percentage</th><th scope="col">Target Value</th><th scope="col">Added Value</th><th scope="col">Sell or Purchase</th><th scope="col">Cost or Value</th></tr></thead>
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
            <tfoot><tr><th>Total</th><td></td><td></td><td></td><td></td><td>{this.props.totalAssets}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot>
            </Table>
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
