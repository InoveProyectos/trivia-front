import { useContext, useEffect, useState } from "react";
import "./App.scss";
import io from "socket.io-client";
import Home from "./views/Home/Home";
import { Route, Routes, useLocation, useParams } from "react-router";
import Lobby from "./views/Lobby/Lobby";
import Challenge from "./views/Challenge/Challenge";
import QuestionFinished from "./views/QuestionFinished/QuestionFinished";
import Challengefinished from "./views/ChallengeEnd/Challengefinished";
import LoadScreen from "./views/LoadScreen/LoadScreen";
import { AppContext, useMyAppContext } from "./Contexts/AppContext";
import useTrivia from "./hooks/useTrivia";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:4000");

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { setHasLink } = useMyAppContext();
  const { getTriviaById } = useTrivia();
  const { id } = useParams();

  // useEffect(() => {
  //   //logica para saber si ingresa por link o no
  //   let lobbyId = id;
  //   if (!!lobbyId) {
  //     //ingresa por link
  //     console.log({ lobbyId });

  //     // obtener la partida
  //     const res = getTriviaById(lobbyId);

  //     // console.log({ res });
  //     setHasLink(true);

  //     //logica para saber si es moderada o no
  //     //TODO Descomentar
  //     // res.moderated ? setIsModerate(true) : setIsModerate(false);
  //   } else {
  //     console.log({ lobbyId });

  //     //ingresa por home
  //     setHasLink(false);
  //   }

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/challenge/:id/:idChallenge" element={<Challenge />} />
          <Route
            path="/challenge/questionFinished"
            element={<QuestionFinished />}
          />
          <Route path="/challenge/finished" element={<Challengefinished />} />
        </Routes>
      )}
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
