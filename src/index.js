import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import App from "./components/App.jsx";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
