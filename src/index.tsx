import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./components/App";
import allReducers from "./state/allReducers";
import "./index.css";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
