import React, { Component } from 'react';
import Stock from './Stock';
import PropTypes from 'prop-types';


class Portfolio extends Component {

    render() {
        // <thead><tr><th>Symbol</th><th>Quantity</th><th>Current Price</th><th>Market Value</th><th>Current Percentage</th><th>Target Percentage</th><th>Target Value</th><th>Added Value</th><th>Sell or Purchase</th><th>Cost or Value</th></tr></thead>

        return (this.props.portfolio.map((stock) => (
                <Stock
                    key={stock.id}
                    getQuantity={this.props.getQuantity}
                    delStock={this.props.delStock}
                    stock={stock}
                />
            ))
    )
}
}

Portfolio.propTypes = {
    portfolio: PropTypes.array.isRequired
}

export default Portfolio;
