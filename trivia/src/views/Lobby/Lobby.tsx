import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aviso from "../../components/Aviso/Aviso";
import ButtonBegin from "../../components/ButtonBegin/ButtonBegin";
import ButtonShare from "../../components/ButtonShare/ButtonShare";
import Layout from "../../components/Layout/Layout";
import RoomData from "../../components/RoomData/RoomData";
import { useTriviaContext } from "../../Contexts/AppContext";
import useNotificaiones from "../../hooks/useNotificaiones";
import useTrivia from "../../hooks/useTrivia";
import "./Lobby.scss";

function Lobby() {
  const { trivia, user, answers } = useTriviaContext();
  const { id } = useParams();
  const { getTriviaById } = useTrivia();
  const navigate = useNavigate();
  const { errorToast } = useNotificaiones();

  useEffect(() => {
    getTriviaById(id);
  }, []);

  useEffect(() => {
    console.log("Cambiaron las answers", { answers });
    answers.length > 0
      ? navigate(`/challenge/${trivia.id}`)
      : errorToast("Hubo un error al traer las preguntas");
  }, [answers]);

  return (
    <Layout>
      <div className="cont-lobby">
        <div className="titulo">
          <h1>{trivia.name}</h1>
        </div>
        <div className="instructivo">
          <span>¿Como se juega?</span>
          <p>{trivia.description}</p>
        </div>
        <RoomData roomCode={trivia.id} />
        <ButtonShare roomCode={trivia.id} />
        {trivia.moderated ? (
          user.role !== "estudiante" ? (
            <ButtonBegin roomCode={trivia.id} />
          ) : (
            <Aviso txt="Esperando a que el anfitrion comience la trivia..." />
          )
        ) : (
          <ButtonBegin roomCode={trivia.id} />
        )}
      </div>
    </Layout>
  );
}

export default Lobby;
function errorToast(arg0: string) {
  throw new Error("Function not implemented.");
}
