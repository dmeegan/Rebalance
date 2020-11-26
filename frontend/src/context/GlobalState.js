import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
appState: {
  currentTotalAssets: 0,
  portfolio: [],
  addedAssets: 0,
  newTotalAssets: 0
}}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  function delStock (id) {
    dispatch({
      type: 'DELETE_STOCK',
      payload: id
    });
  }


  return (<GlobalContext.Provider value={{
    appState: state
  }}>
    {children}
  </GlobalContext.Provider>);
}