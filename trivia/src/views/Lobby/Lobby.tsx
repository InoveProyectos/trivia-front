import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aviso from "../../components/Aviso/Aviso";
import ButtonBegin from "../../components/ButtonBegin/ButtonBegin";
import ButtonShare from "../../components/ButtonShare/ButtonShare";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import RoomData from "../../components/RoomData/RoomData";
import { useMyAppContext } from "../../Contexts/AppContext";
import useTrivia from "../../hooks/useTrivia";
import { intTrivia } from "../../interfaces";

import "./Lobby.scss";

function Lobby() {
  const { id } = useParams();
  const { getTriviaById } = useTrivia();
  const { trivia } = useMyAppContext();

  useEffect(() => {}, []);

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
        <RoomData />
        <ButtonShare />
        <ButtonBegin />
        <Aviso txt="Esperando a que el anfitrion comience la trivia..." />
      </div>
    </Layout>
  );
}

export default Lobby;
