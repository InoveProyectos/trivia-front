import { useState } from "react";
import "./App.scss";
import io from "socket.io-client";
import Home from "./views/Home/Home";
import { Route, Routes } from "react-router";
import Lobby from "./views/Lobby/Lobby";
import Challenge from "./views/Challenge/Challenge";
import QuestionFinished from "./views/QuestionFinished/QuestionFinished";
import Challengefinished from "./views/ChallengeEnd/Challengefinished";

const socket = io("http://localhost:4000");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route
          path="/challenge/questionFinished"
          element={<QuestionFinished />}
        />
        <Route path="/challenge/finished" element={<Challengefinished />} />
      </Routes>
    </div>
  );
}

export default App;
