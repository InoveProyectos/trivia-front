import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";

export const useTrivia = () => {
  const [state, setState] = useState();
  const { socket } = useContext(SocketContext);

  const getTrivia = () => {
    if (!socket) {
      return <div>No se pudo conectar con el servidor</div>;
    }

    socket.emit("get-trivia", { id: 2 });

    socket.on("get-trivia-res", (data) => {
      console.log("res del servidor", data);
    });
  };

  return { getTrivia };
};

export default useTrivia;
