import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
   <ToastContainer position="top-right" autoClose={3000} />
    <App />
  </BrowserRouter>
);
