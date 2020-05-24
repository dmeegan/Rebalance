import React from 'react';
import FetchStockSymbol from './fetchStockSymbol.js';

class AcceptUserStockSymbol extends Component {
    


    handleInput = (event) => {
        this.setState({
            userSymbolInput: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInput} />
                <FetchStockSymbol currentPortfolio={this.state.userPortfolio} userSymbolInput={this.state.userSymbolInput}>Add stock to Portfolio</FetchStockSymbol>
            </div>
        )
    };
};

export default AcceptUserStockSymbol;