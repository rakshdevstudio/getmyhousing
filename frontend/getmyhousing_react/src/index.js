import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScrollToTop } from "./components/functional-component/ScrollToTop"
import store from "./global/redux/store";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <App />
          <ToastContainer position="top-center" />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
