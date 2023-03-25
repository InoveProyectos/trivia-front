import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext, useMyAppContext } from "../Contexts/AppContext";
import { SocketContext } from "../Contexts/SocketContext";
import { intTrivia } from "../interfaces";
import useNotificaiones from "./useNotificaiones";

const useTrivia = () => {
  const { socket } = useContext(SocketContext);
  const { setTrivia, setAnswers } = useMyAppContext();
  const { errorToast } = useNotificaiones();

  const getTriviaById = async (id: string | number | undefined) => {
    if (!socket) {
      return <div>No se pudo conectar con el servidor</div>;
    }

    socket.emit("get-triviaById", { id: id });

    return new Promise((resolve, reject) => {
      socket.on("get-triviaById-res", async (data) => {
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
    if (!socket) {
      return <div>No se pudo conectar con el servidor</div>;
    }

    socket.emit("startTrivia", { id: id });

    return new Promise((res, rej) => {
      socket.on("startTriviaRes", async (data) => {
        try {
          if (data.hasOwnProperty("err")) {
            errorToast(data.err);
            rej(data.err);
          } else {
            const resAnswers = data.res;
            console.log("dataTrivia", { resAnswers });
            setAnswers(resAnswers);
            res(resAnswers);
          }
        } catch (err) {
          console.log(err);
          rej(err);
        }
      });
    });
  };

  return { getTriviaById, startTrivia };
};

export default useTrivia;
