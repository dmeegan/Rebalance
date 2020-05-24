import React from 'react';
import FetchStockSymbol from './fetchStockSymbol.js';

class AcceptUserStockSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userSymbolInput: '',
            userPortfolio: []
        };
    };


    render() {
        return (
            <div>
                                <output className="table output" id="symbolOutput" />

            </div>
        )
    };
};

export default AcceptUserStockSymbol;