import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
<<<<<<< HEAD
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

module.hot.accept();
=======
import App from "./components/App.jsx";

>>>>>>> chore: add --coverage argument to jest tests
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
