import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aviso from "../../components/Aviso/Aviso";
import ButtonBegin from "../../components/ButtonBegin/ButtonBegin";
import ButtonShare from "../../components/ButtonShare/ButtonShare";
import Layout from "../../components/Layout/Layout";
import RoomData from "../../components/RoomData/RoomData";
import { useTriviaContext } from "../../Contexts/TriviaContext";
import useNotificaiones from "../../hooks/useNotificaiones";
import useTrivia from "../../hooks/useTrivia";
import "./Lobby.scss";
import useUser from "../../hooks/useUser";
import { AppContext } from "../../Contexts/AppContext";

function Lobby() {
  const { trivia, user } = useTriviaContext();
  const { id, userName } = useParams();
  const { getTriviaById } = useTrivia();
  const { getUserByUsername } = useUser();
  const { setLoaderScreen, setErrorScreen } = useContext(AppContext);
  const { startTrivia } = useTrivia();
  const { errorToast } = useNotificaiones();

  useEffect(() => {
    const getData = async () => {
      try {
        const userNameRes = await getUserByUsername(userName, id);
        await getTriviaById(id, userNameRes);
        setLoaderScreen(false);
      } catch (err) {
        setLoaderScreen(false);
        setErrorScreen(true);
      }
    };
    getData();
  }, []);

  const handleStartTrivia = async () => {
    startTrivia(trivia.id)
      .then((res: any) => {
        console.log(res);
        if (res.length > 0) {
          console.log(res);
          //TODO mostrar mensaje de exito al moderador
        } else {
          errorToast("Hubo un error al traer las preguntas");
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.messaje);
      });
  };

  return (
    <>
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
          {trivia.moderated ? (
            user.role !== "estudiante" ? (
              <ButtonBegin handleClick={handleStartTrivia} />
            ) : (
              <Aviso txt="Esperando a que el anfitrion comience la trivia..." />
            )
          ) : (
            <ButtonBegin handleClick={handleStartTrivia} />
          )}
        </div>
      </Layout>
    </>
  );
}

export default Lobby;
