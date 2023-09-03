import "./App.scss";
import { Route, Routes } from "react-router";
import Lobby from "./views/Lobby/Lobby";
import Challenge from "./views/Challenge/Challenge";
import QuestionFinished from "./views/QuestionFinished/QuestionFinished";
import { ToastContainer } from "react-toastify";
import useTriviaListeners from "./hooks/useTriviaListeners";
import "react-toastify/dist/ReactToastify.css";
import EndTrivia from "./views/EndTrivia/EndTrivia";
import useTrivia from "./hooks/useTrivia";
import { useEffect } from "react";

function App() {

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/lobby/:id/:userName" element={<Lobby />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        {/* <Route
          path="/challenge/:id/questionFinished"
          element={<QuestionFinished />}
        /> */}
        <Route path="/challenge/:id/finished" element={<EndTrivia />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
