import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTriviaContext } from "../../Contexts/AppContext";
import { SocketContext } from "../../Contexts/SocketContext";
import useNotificaiones from "../../hooks/useNotificaiones";
import useTrivia from "../../hooks/useTrivia";
import { intAnswer, intRoomData } from "../../interfaces";
import "./ButtonBegin.scss";

function ButtonBegin({ roomCode }: intRoomData) {
  const { socket } = useContext(SocketContext);
  const { answers } = useTriviaContext();
  const { startTrivia, listeningStartTrivia } = useTrivia();
  const { errorToast } = useNotificaiones();
  const navigate = useNavigate();

  // useEffect(() => {

  // const escuchando = async () => {
  //   let res: any = await listeningStartTrivia();
  //   console.log({ res });
  //   res.length > 0
  //     ? navigate(`/challenge/${roomCode}`)
  //     : errorToast("Hubo un error al traer las preguntas");
  // };

  // escuchando();

  const handleStartTrivia = async () => {
    // try {
    startTrivia(roomCode);
    // let res: any = await listeningStartTrivia();
    // console.log({ res });
    // res.length > 0
    //   ? navigate(`/challenge/${roomCode}`)
    //   : errorToast("Hubo un error al traer las preguntas");
    // } catch (err) {
    //   console.log(err);
    //   errorToast("Hubo un error");
    // }
  };

  return (
    <button className="btn btn-begin" onClick={handleStartTrivia}>
      Comenzar
    </button>
  );
}

export default ButtonBegin;
