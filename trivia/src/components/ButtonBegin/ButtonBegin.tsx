import { useNavigate } from "react-router-dom";
import useNotificaiones from "../../hooks/useNotificaiones";
import useTrivia from "../../hooks/useTrivia";
import { intRoomData } from "../../interfaces";
import "./ButtonBegin.scss";

function ButtonBegin({ roomCode }: intRoomData) {
  const { startTrivia } = useTrivia();
  const { errorToast } = useNotificaiones();
  const navigate = useNavigate();

  const handleStartTrivia = async () => {
    try {
      let res: any = await startTrivia(roomCode);
      console.log({ res });
      res.length > 0
        ? navigate("/challenge/:id/:idChallenge")
        : errorToast("Hubo un error al traer las preguntas");
    } catch (err) {
      console.log(err);
      errorToast("Hubo un error");
    }
  };

  return (
    <button className="btn btn-begin" onClick={handleStartTrivia}>
      Comenzar
    </button>
  );
}

export default ButtonBegin;
