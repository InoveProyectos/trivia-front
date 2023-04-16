import { useContext, useEffect, useState } from "react";
import { useTriviaContext } from "../Contexts/AppContext";
import { SocketContext } from "../Contexts/SocketContext";

const useUser = () => {
  const { socket } = useContext(SocketContext);
  const { setUser, user } = useTriviaContext();

  const getUserByUsername = async (username: string) => {
    if (!socket) {
      return <div>No se pudo conectar con el servidor</div>;
    }

    socket.emit("getUserByUsername", { username: username });

    return new Promise((resolve, reject) => {
      socket.on("getUserByUsernameRes", async (data) => {
        try {
          if (data.hasOwnProperty("err")) {
            errorToast(data.err);
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

            resolve(res.username);
          }
        } catch (err) {
          console.log("ERROR", err);
          errorToast(err);
          reject(err);
        }
      });
    });
  };

  return { getUserByUsername };
};

export default useUser;
function errorToast(err: any) {
  throw new Error("Function not implemented.");
}
