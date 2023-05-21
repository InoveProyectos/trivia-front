import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTriviaContext } from "../Contexts/TriviaContext";
import { intAnswer, intTrivia } from "../interfaces";
import useNotificaiones from "./useNotificaiones";
import socket from "../Contexts/Socket";

const useTrivia = () => {
  const { setTrivia, setAnswers, setIdChallengeActual, setCountUsersConected } =
    useTriviaContext();
  const { errorToast } = useNotificaiones();
  const navigate = useNavigate();
  // const socket = io("http://localhost:4000");

  socket?.on("listenCountUsersConected", async (data) => {
    console.log(data);
    setCountUsersConected(data);
  });

  // const getTriviaById = (id?: string) => {
  console.log(socket?.connected);
  //   return new Promise((resolve, reject) => {
  //     socket?.emit("get-triviaById", { id: id });

  //     socket?.on("get-triviaById-res", (data) => {
  //       console.log(data);
  //       if (data.hasOwnProperty("err")) {
  //         // errorToast(data.err);
  //         reject(data.err);
  //       } else {
  //         const { res } = data;
  //         console.log({ res });
  //         const dataTrivia = {
  //           id: res.id,
  //           name: res.name,
  //           description: res.description,
  //           moderated: res.moderated,
  //           end_date: res.end_date,
  //         };
  //         // setTrivia(dataTrivia);

  //         resolve(res.id);
  //       }
  //     });
  //   });
  // };

  const getTriviaById = (id?: string) => {
    console.log(socket?.connected);
    return new Promise((resolve, reject) => {
      socket?.emit("get-triviaById", { id: id }, (data: any) => {
        console.log(data);
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
