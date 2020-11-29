import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  currentTotalAssets: 0,
  portfolio: [],
  addedAssets: 0,
  newTotalAssets: 0,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function delStock(id) {
    dispatch({
      type: 'DELETE_STOCK',
      payload: id
    });
  }

  function addStock(newPortfolioItem) {
    dispatch({
      type: 'ADD_STOCK',
      payload: newPortfolioItem
    })
  }


  return (<GlobalContext.Provider value={{
    currentTotalAssets: state.currentTotalAssets,
    portfolio: state.portfolio,
    addedAssets: state.addedAssets,
    newTotalAssets: state.newTotalAssets,
    delStock,
    addStock,
  }}>
    {children}
  </GlobalContext.Provider>);
}