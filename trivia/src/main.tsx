import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
// import { SocketProvider } from "./Contexts/SocketContext";
import { TriviaContextProvider } from "./Contexts/TriviaContext";
import { AppContextProvider } from "./Contexts/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
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
