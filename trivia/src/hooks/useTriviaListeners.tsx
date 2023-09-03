import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTriviaContext } from "../Contexts/TriviaContext";
import { intAnswer, intTrivia, resCall } from "../interfaces";
import useNotificaiones from "./useNotificaiones";
import socket from "../Contexts/Socket";
import useErrorScreen from "./useErrorScreen";
import { AppContext } from "../Contexts/AppContext";

const useTriviaListeners = () => {
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
    setCantResCorrectas,
    setCantOpciones,
    setCantResOpciones,
    setCantQuestions,
  } = useTriviaContext();
  const { errorToast } = useNotificaiones();
  const { setErrorMensajeScreen } = useErrorScreen();
  const { user, setUser } = useTriviaContext();
  const navigate = useNavigate();
  const { setLoaderScreen, setErrorScreen } = useContext(AppContext);

  const quitLoader = () => {
    setTimeout(() => {
      setLoaderScreen(false);
    }, 2000);
  };

  socket.on("listenCountUsersConected", async (data) => {
    setCountUsersConected(data);
  });

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
        quitLoader();
        navigate(`/challenge/${trivia.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  });

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
      data.resRespuestas.map((userRes: any) => {
        if (userRes.id == user.username) {
          setWonScore(userRes.score);
          dataUser.score = +userRes.score;
          setUser(dataUser);
          setCorrectAnswer(userRes.correctAnswer);
        }
      });
      console.log("USER", user);
      setCantResCorrectas(data.cantResCorrectas);
      let arrCantOpciones: string[] = Object.keys(data.cantRespuestas);
      let arrCantResOpciones: any[] = Object.values(data.cantRespuestas);
      setCantOpciones(arrCantOpciones);
      setCantResOpciones(arrCantResOpciones);
      setBlockAnswers(true);
      quitLoader();
    }
    //TODO Probar con la el back de desafio arriba
    //TODO Falta armar que muestre las preguntas incorrectas y agregar para que pase de challenge
  });

  socket.on("resPlayers", (data) => {
    setCantResUsers(data);
  });

  socket.on("nextChallengeRes", (data: any) => {
    setAnswers(data.challenge);
    setEstadoPregunta(data.estadoPregunta);
    setCantResUsers(data.cantResUsers);
    setCorrectAnswer(undefined);
    setAnsSelected(undefined);
    setBlockAnswers(false);
    setWonScore(undefined);
    // setLoaderScreen(false);
    quitLoader();
    setMoreQuestions(data.moreQuestions);
  });

  socket.on("resEndTrivia", (data: any) => {
    setCantQuestions(data.cantQuestions);
    //sacar las respuestas correctas
    // data.players.map((players: any) => {
    //   if (players.id == user.username) {
    //   }
    // });
    navigate(`/challenge/:${trivia.id}/finished`);
    // setLoaderScreen(false);
    quitLoader();
  });

  socket.on("dataTrivia", ()=>{
    console.log("ACA")
  })

  return {
    quitLoader
  };
};

export default useTriviaListeners;
