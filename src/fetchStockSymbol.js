import React from 'react';

class FetchStockSymbol extends React.Component {
    constructor(props) {
        super(props);
    };

    fetchStockSymbol = () => {
        let newPortfolio = this.props.currentPortfolio;
        let symbolToAdd = '';
        let currentPrice = '';
        let newPortfolioItem = [];
        let pointToThis = this;
        let API_Key = 'WTIDRPP8PEFL74TS';
        let Search_API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.props.userSymbolInput}&apikey=${API_Key}`;


        fetch(Search_API_Call)
            .then(
                function (searchResponse) {
                    return searchResponse.json();
                }
            )
            .then(
                function (searchData) {
                    return symbolToAdd = searchData["bestMatches"][0]["1. symbol"];
                }
            )
            .then(
                function (symbolToAdd) {
                    let Quote_API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbolToAdd}&interval=5min&apikey=${API_Key}&outputsize=compact`;

                    fetch(Quote_API_Call)
                        .then(
                            function (quoteResponse) {
                                return quoteResponse.json();
                            }
                        )
                        .then(
                            function (quoteData) {
                                return currentPrice = quoteData["Global Quote"]["05. price"];
                            })
                        .then(
                            function (currentPrice) {
                                newPortfolioItem = [symbolToAdd, currentPrice]
                                newPortfolio.push(newPortfolioItem);
                                pointToThis.setState({ userPortfolio: newPortfolio });
                            }
                        )
                }
            )




    }



    render() {
        return (
            <div>
                <button onClick={this.fetchStockSymbol} type="button" >Add Stock to Portfolio</button>
            </div>
        )
    }
}

export default FetchStockSymbol;