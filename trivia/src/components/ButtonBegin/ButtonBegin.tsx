import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTriviaContext } from "../../Contexts/TriviaContext";
import useNotificaiones from "../../hooks/useNotificaiones";
import useTrivia from "../../hooks/useTrivia";
import { btnBegin, intAnswer, intRoomData } from "../../interfaces";
import "./ButtonBegin.scss";

function ButtonBegin({ handleClick }: btnBegin) {
  return (
    <button className="btn btn-begin" onClick={handleClick}>
      Comenzar
    </button>
  );
}

export default ButtonBegin;
