import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { TriviaContextProvider } from "./Contexts/TriviaContext";
import { AppContextProvider } from "./Contexts/AppContext";
import { PageRealoadDetector } from "./components/PageReloadDetector/PageReloadDetector";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <PageRealoadDetector /> */}
    {/* <SocketProvider> */}
    <TriviaContextProvider>
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </TriviaContextProvider>
    {/* </SocketProvider> */}
  </React.StrictMode>
);
