import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../Contexts/AppContext";
import { SocketContext } from "../Contexts/SocketContext";
import { intTrivia } from "../interfaces";
import useNotificaiones from "./useNotificaiones";

export const useTrivia = () => {
  // const [dataTrivia, setDataTrivia] = useState();
  const { socket } = useContext(SocketContext);
  const { setTrivia, trivia } = useContext(AppContext);
  const { errorToast } = useNotificaiones();

  const getTriviaById = async (id: string | number) => {
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

  return { getTriviaById };
};

export default useTrivia;
