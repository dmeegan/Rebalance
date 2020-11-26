export default (state, action) => {
    switch (action.type) {
        case 'DELETE_STOCK':
            let currentStock = state.portfolio.find(portfolio => portfolio.id === id)
            let currentMarketValue = (currentStock.currentPrice * currentStock.quantity).toFixed(2)
            setState({
                currentTotalAssets: state.currentTotalAssets - currentMarketValue,
                newTotalAssets: state.newTotalAssets - currentMarketValue,
                portfolio: state.portfolio.filter(stock => stock.id !== id)

        default: return state;
            }
}