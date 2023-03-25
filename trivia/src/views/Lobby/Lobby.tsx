import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aviso from "../../components/Aviso/Aviso";
import ButtonBegin from "../../components/ButtonBegin/ButtonBegin";
import ButtonShare from "../../components/ButtonShare/ButtonShare";
import Layout from "../../components/Layout/Layout";
import RoomData from "../../components/RoomData/RoomData";
import { useMyAppContext } from "../../Contexts/AppContext";
import useTrivia from "../../hooks/useTrivia";
import "./Lobby.scss";

function Lobby() {
  const { trivia, user } = useMyAppContext();
  const { id } = useParams();
  const { getTriviaById } = useTrivia();

  useEffect(() => {
    getTriviaById(id);
  }, []);

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
