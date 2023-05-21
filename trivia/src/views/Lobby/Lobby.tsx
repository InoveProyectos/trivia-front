import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { AppContext, useAppContext } from "../../Contexts/AppContext";
import LoadScreen from "../LoadScreen/LoadScreen";

function Lobby() {
  const { trivia, user, answers } = useTriviaContext();
  const { id, userName } = useParams();
  const { getTriviaById } = useTrivia();
  const { getUserByUsername } = useUser();
  const { errorToast } = useNotificaiones();
  const { loader, setLoader } = useContext(AppContext);
  // const { loader, setLoader } = useAppContext();
  // const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all([getTriviaById(id), getUserByUsername(userName)]);
        setLoader(false);
      } catch (err) {
        errorToast("Hubo un error al encontrar la trivia o el usuario");
        setLoader(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      {loader ? (
        <LoadScreen />
      ) : (
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
      )}
    </>
  );
}

export default Lobby;
