import { useContext, useEffect, useState } from "react";
import { useTriviaContext } from "../Contexts/TriviaContext";
import socket from "../Contexts/Socket";
import useErrorScreen from "./useErrorScreen";
import jwt from "jsonwebtoken";
import { intUser } from "../interfaces";

const useUser = () => {
  const { setUser, user } = useTriviaContext();
  const { setErrorMensajeScreen } = useErrorScreen();

  const getUserByUsername = (username?: string, id?: string) => {
    return new Promise((resolve, reject) => {
      let userInStorage = sessionStorage.getItem("uTriv");
      if (userInStorage) {
        let userAux = JSON.parse(userInStorage);
        setUser(userAux);
        resolve(userAux);
      } else {
        socket?.emit("getUserByUsername", { username, id }, (data: any) => {
          console.log(data);
          if (data.hasOwnProperty("err")) {
            setErrorMensajeScreen(
              data.err ? data.err : "No se encontro el usuario"
            );
            reject(data.err);
          } else {
            const { res } = data;
            console.log({ res });
            const dataUser = {
              username: res.username,
              name: res.name,
              is_staff: res.is_staff,
              role: res.role,
              score: res.score,
              bonus: res.bonus,
            };

            sessionStorage.setItem("uTriv", JSON.stringify(dataUser));
            setUser(dataUser);

            resolve(res);
          }
        });
      }
    });
  };

  return { getUserByUsername };
};

export default useUser;
