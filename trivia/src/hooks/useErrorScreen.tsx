import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

const useErrorScreen = () => {
  const { setErrorMensaje } = useContext(AppContext);

  const setErrorMensajeScreen = (mensaje: string) => {
    setErrorMensaje(mensaje);
  };

  return { setErrorMensajeScreen };
};

export default useErrorScreen;
