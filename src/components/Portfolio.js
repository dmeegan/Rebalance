import React, { Component} from 'react';
import Stock from './Stock';
import PropTypes from 'prop-types';


class Portfolio extends Component {

render () {
    return this.props.portfolio.map((stock) => (
        <Stock 
        key={stock.id} 
        getQuantity={this.props.getQuantity} 
        delStock={this.props.delStock} 
        stock={stock}
        />
    ))
}
}

Portfolio.propTypes = {
    portfolio: PropTypes.array.isRequired
}

export default Portfolio;
