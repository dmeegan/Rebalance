import React, { Component } from 'react';
import Stock from './Stock';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import CurrentTotalAssets from './CurrentTotalAssets';
import AddedAssets from './AddedAssets';
import NewTotalAssets from './NewTotalAssets';


class Portfolio extends Component {

    render() {
        if (this.props.portfolio.length > 0) {
        return (
            <div className="portfolioTableContainer">
            <Table striped bordered hover variant="dark">
                         <thead><tr><th scope="col"></th><th scope="col">Symbol</th><th scope="col">Stock Name</th><th scope="col">Quantity</th><th scope="col">Current Price</th><th scope="col">Market Value</th><th scope="col">Current Percentage</th><th scope="col">Target Percentage</th><th scope="col">Target Value</th><th scope="col">Added Value</th><th scope="col">Sell or Purchase</th><th scope="col">Cost or Value</th></tr></thead>
            <tbody>
                {
                this.props.portfolio.map((stock) => (
                <Stock
                    key={stock.id}
                    getQuantity={this.props.getQuantity}
                    delStock={this.props.delStock}
                    currentTotalAssets={this.props.currentTotalAssets}
                    newTotalAssets={this.props.newTotalAssets}
                    stock={stock}
                    handleTargetPercentageInput={this.props.handleTargetPercentageInput}
                />
            )) }
            {/* <tfoot><tr><th>Total</th><td></td><td></td><td></td><td></td><td>{this.props.currentTotalAssets}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot> */}
            <CurrentTotalAssets currentTotalAssets={this.props.currentTotalAssets}/>
            <AddedAssets addedAssets={this.props.addedAssets} handleAddedAssetsInput={this.props.handleAddedAssetsInput}/>
            <NewTotalAssets newTotalAssets={this.props.newTotalAssets}/>
            </tbody> 
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
