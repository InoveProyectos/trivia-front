import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTriviaContext } from "../Contexts/TriviaContext";
import { intAnswer, intTrivia, resCall } from "../interfaces";
import useNotificaiones from "./useNotificaiones";
import socket from "../Contexts/Socket";
import useErrorScreen from "./useErrorScreen";
import { AppContext } from "../Contexts/AppContext";

const useTrivia = () => {
  const {
    trivia,
    setTrivia,
    setAnswers,
    setIdChallengeActual,
    setCountUsersConected,
    setWonScore,
    setCorrectAnswer,
    setBlockAnswers,
    setEstadoPregunta,
    setEstadoTrivia,
    setMoreQuestions,
    setCantResUsers,
    setAnsSelected,
  } = useTriviaContext();
  const { errorToast } = useNotificaiones();
  const { setErrorMensajeScreen } = useErrorScreen();
  const { user, setUser } = useTriviaContext();
  const navigate = useNavigate();
  const { setLoaderScreen, setErrorScreen } = useContext(AppContext);

  socket.on("listenCountUsersConected", async (data) => {
    console.log(data);
    setCountUsersConected(data);
  });

  const getTriviaById = (id?: string, user?: any) => {
    console.log(socket?.connected);
    return new Promise((resolve, reject) => {
      socket.emit("get-triviaById", { id: id, user: user }, (data: any) => {
        console.log(data);
        if (data.hasOwnProperty("err")) {
          setErrorMensajeScreen("No se encontro la trivia");
          reject(data.err);
        } else {
          const { res } = data;
          console.log({ res });
          const dataTrivia = {
            id: res.id,
            name: res.name,
            description: res.description,
            moderated: res.moderated,
            end_date: res.end_date,
          };
          setTrivia(dataTrivia);

          resolve(res.id);
        }
      });
    });
  };

  const startTrivia = async (id?: number | null) => {
    return new Promise((res, rej) => {
      let params;
      if (trivia.moderated) {
        params = {
          id: id,
        };
      } else {
        params = {
          id: id,
          username: user.username,
        };
      }
      socket.emit("startTrivia", params, (data: resCall) => {
        console.log(data);
        if (data.status != 200) {
          rej(data.messaje);
        } else {
          console.log(data);
        }
      });
    });
  };

  socket.on("startTriviaRes", async (data) => {
    try {
      if (data.hasOwnProperty("err")) {
        errorToast(data.err);
      } else {
        const resAnswers: intAnswer = data.challenges;
        console.log(data);
        console.log("dataTrivia", { resAnswers });
        setAnswers(resAnswers);
        setMoreQuestions(data.moreQuestions);
        navigate(`/challenge/${trivia.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const sendAnsSelected = (ans?: number) => {
    socket.emit("ansSelected", {
      userName: user.username,
      id: trivia.id,
      res: ans,
    });
  };

  const ValidarPregunta = () => {
    // socket.emit("showLoader", {
    //   id: trivia.id,
    //   show: true,
    // });

    socket.emit("validarPreguntas", {
      id: trivia.id,
    });
  };

  socket.on("showLoaderRes", (data: boolean) => {
    setLoaderScreen(data);
  });

  socket.on("estadoTrivia", (data: any) => {
    console.log("cambio el estado de la trivia a: " + data);
    setEstadoTrivia(data);
  });

  socket.on("estadoPregunta", (data: any) => {
    console.log("cambio el estado de la Pregunta a: " + data);
    setEstadoPregunta(data);
  });

  socket.on("validarPreguntasRes", (data: any) => {
    const dataUser = user;
    if (user.username) {
      data.map((userRes: any) => {
        if (userRes.id == user.username) {
          setWonScore(userRes.score);
          dataUser.score = +userRes.score;
          setUser(dataUser);
        }
      });
      console.log("USER", user);
      setBlockAnswers(true);
      setLoaderScreen(false);
    }
    //TODO Probar con la el back de desafio arriba
    //TODO Falta armar que muestre las preguntas incorrectas y agregar para que pase de challenge
  });

  socket.on("resPlayers", (data) => {
    setCantResUsers(data);
  });

  const nextChallenge = () => {
    socket.emit("nextChallenge", trivia.id, (data: any) => {
      console.log(data);
    });
  };

  socket.on("nextChallengeRes", (data: any) => {
    setAnswers(data.challenge);
    setEstadoPregunta(data.estadoPregunta);
    setCantResUsers(data.cantResUsers);
    setCorrectAnswer(undefined);
    setAnsSelected(undefined);
    setBlockAnswers(false);
    setWonScore(undefined);
    setLoaderScreen(false);
  });

  const finishTrivia = () => {
    socket.emit("finishChallenge");
  };

  return {
    getTriviaById,
    startTrivia,
    sendAnsSelected,
    ValidarPregunta,
    nextChallenge,
    finishTrivia,
  };
};

export default useTrivia;
