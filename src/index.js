import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
const container = document.getElementById("root");
const root = createRoot(container);
import { Provider } from "react-redux";
import store from "./app/store";
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
