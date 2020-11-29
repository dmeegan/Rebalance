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

  function handleQuantityInput(e, id) {
    let userQuantityInput = +e.target.value;
    if (userQuantityInput < 0) {
      userQuantityInput = 0;
    }
    dispatch({
      type: 'HANDLE_QUANTITY_INPUT',
      payload: { id, userQuantityInput }
    })
  }

  function handleTargetPercentageInput(e, id) {
    console.log(e.target.value, id)
    let userPercentageInput = +(e.target.value);
    if (userPercentageInput > 100) {
      userPercentageInput = 100
    } else if (userPercentageInput < 0) {
      userPercentageInput = 0
    }
    dispatch({
      type: 'HANDLE_TARGET_PERCENTAGE_INPUT',
      payload: { id, userPercentageInput }
    })
  }

  function handleAddedAssetsInput(e) {
    let userAddedAssetsInput = +e.target.value;
    if (userAddedAssetsInput < 0) {
      userAddedAssetsInput = 0
    }
    dispatch({
      type: 'HANDLE_ADDED_ASSET_INPUT',
      payload: userAddedAssetsInput
    })
  }

  return (<GlobalContext.Provider value={{
    currentTotalAssets: state.currentTotalAssets,
    portfolio: state.portfolio,
    addedAssets: state.addedAssets,
    newTotalAssets: state.newTotalAssets,
    delStock,
    addStock,
    handleQuantityInput,
    handleTargetPercentageInput,
    handleAddedAssetsInput
  }}>
    {children}
  </GlobalContext.Provider>);
}