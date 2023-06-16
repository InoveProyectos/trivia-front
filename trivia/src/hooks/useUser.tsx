import { useContext, useEffect, useState } from "react";
import { useTriviaContext } from "../Contexts/TriviaContext";
import socket from "../Contexts/Socket";
import useErrorScreen from "./useErrorScreen";

const useUser = () => {
  const { setUser, user } = useTriviaContext();
  const { setErrorMensajeScreen } = useErrorScreen();
  // const socket = io("http://localhost:4000");

  // const getUserByUsername = (username?: string) => {
  //   return new Promise((resolve, reject) => {
  //     socket?.emit("getUserByUsername", { username: username });

  //     socket?.on("getUserByUsernameRes", (data) => {
  //       console.log(data);
  //       if (data.hasOwnProperty("err")) {
  //         errorToast(data.err);
  //         reject(data.err);
  //       } else {
  //         const { res } = data;
  //         console.log({ res });
  //         const dataUser = {
  //           username: res.username,
  //           name: res.name,
  //           is_staff: res.is_staff,
  //           role: res.role,
  //           score: res.score,
  //           bonus: res.bonus,
  //         };
  //         setUser(dataUser);

  //         resolve(res.username);
  //       }
  //     });
  //   });
  // };

  const getUserByUsername = (username?: string) => {
    return new Promise((resolve, reject) => {
      socket?.emit("getUserByUsername", { username }, (data: any) => {
        console.log(data);
        if (data.hasOwnProperty("err")) {
          setErrorMensajeScreen("No se encontro el usuario");
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
          setUser(dataUser);

          resolve(res);
        }
      });
    });
  };

  return { getUserByUsername };
};

export default useUser;
