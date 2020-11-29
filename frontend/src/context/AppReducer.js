export default function AppReducer(state, action) {
    switch (action.type) {
        case 'DELETE_STOCK':
            let currentStock = state.portfolio.find(portfolio => portfolio.id === action.payload);
            let currentMarketValue = (currentStock.currentPrice * currentStock.quantity).toFixed(2);
            return {
                ...state,
                currentTotalAssets: state.currentTotalAssets - currentMarketValue,
                newTotalAssets: state.newTotalAssets - currentMarketValue,
                portfolio: state.portfolio.filter(portfolio => portfolio.id !== action.payload)
            };

        case 'ADD_STOCK':
            return {
                ...state,
                portfolio: [...state.portfolio, action.payload]
            };

        case 'HANDLE_QUANTITY_INPUT':
            let assetsAccumulator = 0;
            console.log(+action.payload.userQuantityInput, action.payload.id)
            return {
                ...state,
                portfolio: state.portfolio.map(stock => {
                    if (stock.id === action.payload.id) {
                        stock["quantity"] = +action.payload.userQuantityInput;
                    };
                    assetsAccumulator += (stock.currentPrice * stock.quantity);
                    return stock;
                }),
                currentTotalAssets: +assetsAccumulator.toFixed(2),
                newTotalAssets: (state.addedAssets + assetsAccumulator).toFixed(2)
            };

        case 'HANDLE_TARGET_PERCENTAGE_INPUT':
            return {
                ...state,
                portfolio: state.portfolio.map(stock => {
                    if (stock.id === action.payload.id) {
                        stock["targetPercentage"] = action.payload.userPercentageInput;
                    };
                    return stock;
                })};

        default:
            return state;
    }
}