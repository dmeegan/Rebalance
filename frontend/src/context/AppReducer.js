import axios from 'axios';

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

        default:
            return state;
    }
}