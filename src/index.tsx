import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/App";
import allReducers from "./state/allReducers";
import "/index.css";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
