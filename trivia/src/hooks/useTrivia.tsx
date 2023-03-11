import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SocketContext } from "../Contexts/SocketContext";
import { intTrivia } from "../interfaces";

export const useTrivia = () => {
  const [state, setState] = useState();
  const { socket } = useContext(SocketContext);
  let [flag, setFlag] = useState<boolean>(false);

  const getTriviaById = async (id: string | number) => {
    if (!socket) {
      return <div>No se pudo conectar con el servidor</div>;
    }

    socket.emit("get-triviaById", { id: id });

    socket.on("get-triviaById-res", (data) => {
      if (data.hasOwnProperty("err")) {
        console.log("err del servidor", data);
        if (!flag) {
          toast.error(`${data.err}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFlag(true);
          return data.err;
        }
      } else {
        console.log("res del servidor", data);
        return data.res;
      }
    });
  };

  return { getTriviaById };
};

export default useTrivia;
