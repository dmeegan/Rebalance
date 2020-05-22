import React from 'react';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: '',
            stockSymbol: 'MSFT',
        };
    };

        

    componentDidMount() {
        this.fetchStock();
    };

    fetchStock() {
        let pointToThis = this;
        let API_Key = 'WTIDRPP8PEFL74TS';
        let API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.stockSymbol}&interval=5min&apikey=${API_Key}&outputsize=compact`;

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    pointToThis.setState({currentPrice: data["Global Quote"]["05. price"]});
                })
            }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
        <p>The current price of ${this.state.stockSymbol} is ${this.state.currentPrice}!</p>
            </div>
        )
    }
}

export default Stock;
