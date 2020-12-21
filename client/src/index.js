import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BaseStyles } from 'rimble-ui';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "@drizzle/store";
import TestMinter from "./contracts/TestMinter.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [TestMinter],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545/",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
    <BaseStyles>
      <App drizzle={drizzle}/>
    </BaseStyles>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
