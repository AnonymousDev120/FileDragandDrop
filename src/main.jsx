import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CreateContextProvider } from "./Context/CreateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreateContextProvider>
      <App />
    </CreateContextProvider>
  </React.StrictMode>
);
