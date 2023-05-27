import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTriviaContext } from "../Contexts/TriviaContext";
import { intAnswer, intTrivia, resCall } from "../interfaces";
import useNotificaiones from "./useNotificaiones";
import socket from "../Contexts/Socket";
import useErrorScreen from "./useErrorScreen";

const useTrivia = () => {
  const {
    trivia,
    setTrivia,
    setAnswers,
    setIdChallengeActual,
    setCountUsersConected,
  } = useTriviaContext();
  const { errorToast } = useNotificaiones();
  const { setErrorMensajeScreen } = useErrorScreen();
  const { user } = useTriviaContext();
  const navigate = useNavigate();

  socket.on("listenCountUsersConected", async (data) => {
    console.log(data);
    setCountUsersConected(data);
  });

  const getTriviaById = (id?: string, userName?: string) => {
    console.log(socket?.connected);
    return new Promise((resolve, reject) => {
      socket.emit(
        "get-triviaById",
        { id: id, userNameId: userName },
        (data: any) => {
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
        }
      );
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

  // const listeningStartTrivia = () => {
  //   return new Promise((res, rej) => {
  socket.on("startTriviaRes", async (data) => {
    try {
      if (data.hasOwnProperty("err")) {
        errorToast(data.err);
        // rej(data.err);
      } else {
        const resAnswers: Array<intAnswer> = data.challenges;
        console.log(data);
        console.log("dataTrivia", { resAnswers });
        setAnswers(resAnswers);
        setIdChallengeActual(data.idChallengeActual);
        navigate(`/challenge/${data.id}`);
        // res(resAnswers);
      }
    } catch (err) {
      console.log(err);
      // rej(err);
    }
  });
  //   });
  // };

  const nextChallenge = (roomCode?: string, idChallegeNum?: number) => {
    socket.emit("nextChallenge");

    //Ver como hacer para calificar
  };

  socket.on("nextChallengeRes", (data) => {
    console.log("Pasamos al siguiente paso de la trivia");
    setIdChallengeActual(data.idChallengeActual);
  });

  const finishTrivia = () => {
    socket.emit("finishChallenge");
  };

  return {
    getTriviaById,
    startTrivia,
    nextChallenge,
    finishTrivia,
  };
};

export default useTrivia;
