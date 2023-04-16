import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext, useTriviaContext } from "../Contexts/AppContext";
import { SocketContext } from "../Contexts/SocketContext";
import { intAnswer, intTrivia } from "../interfaces";
import useNotificaiones from "./useNotificaiones";

const useTrivia = () => {
  const { socket } = useContext(SocketContext);
  const { setTrivia, setAnswers, setIdChallengeActual, setCountUsersConected } =
    useTriviaContext();
  const { errorToast } = useNotificaiones();
  const navigate = useNavigate();

  socket?.on("listenCountUsersConected", async (data) => {
    console.log(data);
    setCountUsersConected(data);
  });

  const getTriviaById = async (id: string | number | undefined) => {
    socket?.emit("get-triviaById", { id: id });

    return new Promise((resolve, reject) => {
      socket?.on("get-triviaById-res", async (data) => {
        try {
          if (data.hasOwnProperty("err")) {
            errorToast(data.err);
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
        } catch (err) {
          console.log("ERROR", err);
          // errorToast(err);
          reject(err);
        }
      });
    });
  };

  const startTrivia = async (id: string | number | undefined | null) => {
    socket?.emit("startTrivia", { id: id });

    // return new Promise((res, rej) => {
    //   socket?.on("startTriviaRes", async (data) => {
    //     try {
    //       if (data.hasOwnProperty("err")) {
    //         errorToast(data.err);
    //         rej(data.err);
    //       } else {
    //         const resAnswers: Array<intAnswer> = data.res;
    //         console.log(data);
    //         console.log("dataTrivia", { resAnswers });
    //         setAnswers(resAnswers);
    //         setIdChallengeActual(data.idChallengeActual);
    //         res(resAnswers);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       rej(err);
    //     }
    //   });
    // });
  };

  const listeningStartTrivia = () => {
    return new Promise((res, rej) => {
      socket?.on("startTriviaRes", async (data) => {
        try {
          if (data.hasOwnProperty("err")) {
            errorToast(data.err);
            rej(data.err);
          } else {
            const resAnswers: Array<intAnswer> = data.res;
            console.log(data);
            console.log("dataTrivia", { resAnswers });
            setAnswers(resAnswers);
            setIdChallengeActual(data.idChallengeActual);
            res(resAnswers);
          }
        } catch (err) {
          console.log(err);
          rej(err);
        }
      });
    });
  };

  socket?.on("startTriviaRes", async (data) => {
    try {
      if (data.hasOwnProperty("err")) {
        errorToast(data.err);
      } else {
        const resAnswers: Array<intAnswer> = data.res;
        console.log(data);
        console.log("dataTrivia", { resAnswers });
        setAnswers(resAnswers);
        setIdChallengeActual(data.idChallengeActual);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const nextChallenge = (roomCode?: string, idChallegeNum?: number) => {
    socket?.emit("nextChallenge");

    //Ver como hacer para calificar
  };

  socket?.on("nextChallengeRes", (data) => {
    console.log("Pasamos al siguiente paso de la trivia");
    setIdChallengeActual(data.idChallengeActual);
  });

  const finishTrivia = () => {
    socket?.emit("finishChallenge");
  };

  return {
    getTriviaById,
    startTrivia,
    listeningStartTrivia,
    nextChallenge,
    finishTrivia,
  };
};

export default useTrivia;
