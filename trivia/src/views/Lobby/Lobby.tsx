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
  const [resTrivia, setResTrivia] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {}, []);

  console.log({ id, resTrivia });
  return (
    <Layout>
      <div className="cont-lobby">
        <div className="titulo">
          <h1>PI-06 Unidad 1</h1>
        </div>
        <div className="instructivo">
          <span>¿Como se juega?</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus saepe nihil dicta voluptas, explicabo rem possimus
            facilis consectetur beatae delectus molestiae, architecto mollitia.
            Ipsum dolor, saepe sequi numquam enim aut?
          </p>
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
