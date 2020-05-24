import React, {Component} from 'react';

class AddStock extends Component {
    state = {
        userSymbolInput:'',
      }


    handleUserInput = (e) => {
        this.setState({
            userSymbolInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addStock(this.state.userSymbolInput);
        this.setState({userSymbolInput: ''})
    };

    // fetchStockSymbol = () => {
    //     let newPortfolio = this.props.currentPortfolio;
    //     let newPortfolioItem = [];
    //     let pointToThis = this;
    //     let API_Key = 'WTIDRPP8PEFL74TS';
    //     let Search_API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.userSymbolInput}&apikey=${API_Key}`;


    //     fetch(Search_API_Call)
    //         .then(
    //             function (searchResponse) {
    //                 return searchResponse.json();
    //             }
    //         )
    //         .then(
    //             function (searchData) {
    //                 return symbolToAdd = searchData["bestMatches"][0]["1. symbol"];
    //             }
    //         )
    //         .then(
    //             function (symbolToAdd) {
    //                 let Quote_API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbolToAdd}&interval=5min&apikey=${API_Key}&outputsize=compact`;

    //                 fetch(Quote_API_Call)
    //                     .then(
    //                         function (quoteResponse) {
    //                             return quoteResponse.json();
    //                         }
    //                     )
    //                     .then(
    //                         function (quoteData) {
    //                             return currentPrice = quoteData["Global Quote"]["05. price"];
    //                         })
    //                     .then(
    //                         function (currentPrice) {
    //                             newPortfolioItem = [symbolToAdd, currentPrice]
    //                             newPortfolio.push(newPortfolioItem);
    //                             pointToThis.setState({ userPortfolio: newPortfolio });
    //                         }
    //                     )
    //             }
    //         )
    // }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleUserInput} value={this.state.userSymbolInput} />
            <button type="submit">Add Stock</button>
            </form>
        )
};
}

export default AddStock;