import React from "react";
import ReactDOM from "react-dom";

const title = "Welcome to Authors Haven";

ReactDOM.render(
  <React.Fragment>
    <h1>{title}</h1>
  </React.Fragment>,
  document.getElementById("root")
);

module.hot.accept();
