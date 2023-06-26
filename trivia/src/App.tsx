import { useContext, useEffect, useState } from "react";
import "./App.scss";
import io from "socket.io-client";
import Home from "./views/Home/Home";
import { Route, Routes } from "react-router";
import Lobby from "./views/Lobby/Lobby";
import Challenge from "./views/Challenge/Challenge";
import QuestionFinished from "./views/QuestionFinished/QuestionFinished";
import Challengefinished from "./views/ChallengeEnd/Challengefinished";
import LoadScreen from "./views/LoadScreen/LoadScreen";
// import { TriviaContext, useTriviaContext } from "./Contexts/TriviaContext";
// import useTrivia from "./hooks/useTrivia";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext, useAppContext } from "./Contexts/AppContext";
import socket from "./Contexts/Socket";
import { useLocation, useParams } from "react-router-dom";
import useTrivia from "./hooks/useTrivia";
import useUser from "./hooks/useUser";
import { useTriviaContext } from "./Contexts/TriviaContext";
import useErrorScreen from "./hooks/useErrorScreen";

function App() {
  // const { trivia, user, answers } = useTriviaContext();
  // const { id, userName } = useParams();
  // const { getTriviaById } = useTrivia();
  // const { getUserByUsername } = useUser();
  // const { setLoaderScreen, setErrorScreen } = useContext(AppContext);
  // const { setErrorMensajeScreen } = useErrorScreen();
  // const location = useLocation();

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     if (userName) {
  //       const userNameRes = await getUserByUsername(userName);
  //       await getTriviaById(id, userNameRes);
  //       setLoaderScreen(false);
  //     }
  //   } catch (err) {
  //     setLoaderScreen(false);
  //     setErrorScreen(true);
  //   }
  // };
  // const { setHasLink } = useTriviaContext();
  // const { getTriviaById } = useTrivia();
  // const { id } = useParams();
  // const socket = io("http://localhost:4000");

  // let socket: any = {};

  // useEffect(() => {
  //   if (socket.id) {
  //     socket = io("http://localhost:4000");
  //   }
  // });

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
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/lobby/:id/:userName" element={<Lobby />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        <Route
          path="/challenge/:id/questionFinished"
          element={<QuestionFinished />}
        />
        <Route path="/challenge/:id/finished" element={<Challengefinished />} />
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
