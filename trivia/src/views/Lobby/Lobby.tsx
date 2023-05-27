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
import useErrorScreen from "../../hooks/useErrorScreen";

function Lobby() {
  const { trivia, user, answers } = useTriviaContext();
  const { id, userName } = useParams();
  const { getTriviaById } = useTrivia();
  const { getUserByUsername } = useUser();
  const { setLoaderScreen, setErrorScreen } = useContext(AppContext);
  const { startTrivia } = useTrivia();
  const { errorToast } = useNotificaiones();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all([
          getUserByUsername(userName),
          getTriviaById(id, userName),
        ]);
        setLoaderScreen(false);
      } catch (err) {
        setLoaderScreen(false);
        setErrorScreen(true);
      }
    };
    getData();
  }, []);

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
    startTrivia(trivia.id)
      .then((res: any) => {
        console.log(res);
        if (res.length > 0) {
          navigate(`/challenge/${trivia.id}`);
        } else {
          errorToast("Hubo un error al traer las preguntas");
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.messaje);
      });
    // try {
    // startTrivia(roomCode);
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
          {/* <ButtonShare roomCode={trivia.id} /> */}
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
