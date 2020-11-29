import React from 'react';
import Portfolio from './components/Portfolio';
import AddStock from './components/AddStock';
import TopNav from './components/TopNav';
import SignIn from './components/SignIn';
import Register from './components/Register';
import { GlobalProvider } from './context/GlobalState';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default function App() {

  return (
    <GlobalProvider>
      <Router>
        <TopNav />
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/Rebalance">
          <AddStock />
          <Portfolio
          // getQuantity={getQuantity}
          // currentTotalAssets={state.currentTotalAssets}
          // addedAssets={state.addedAssets}
          // newTotalAssets={state.newTotalAssets}
          // delStock={delStock}
          // portfolio={state.portfolio}
          // handleTargetPercentageInput={handleTargetPercentageInput}
          // handleAddedAssetsInput={handleAddedAssetsInput}
          />
        </Route>
      </Router>
    </GlobalProvider>
  )
};