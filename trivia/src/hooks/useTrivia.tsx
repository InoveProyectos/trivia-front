import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTriviaContext } from "../Contexts/TriviaContext";
import { intAnswer, intTrivia, resCall } from "../interfaces";
import useNotificaiones from "./useNotificaiones";
import socket from "../Contexts/Socket";
import useErrorScreen from "./useErrorScreen";
import { AppContext } from "../Contexts/AppContext";
import useTriviaListeners from "./useTriviaListeners";
import useTextos from "./useTextos";

const useTrivia = () => {
  const {
    trivia,
    firstData,
    nameRoom,
    setTrivia,
    setAnswers,
    setIdChallengeActual,
    setCountUsersConected,
    setWonScore,
    setCorrectAnswer,
    setBlockAnswers,
    setEstadoPregunta,
    setEstadoTrivia,
    setMoreQuestions,
    setCantResUsers,
    setAnsSelected,
    setFirstData,
    setCantResOpciones,
    setCantOpciones,
    setCantResCorrectas,
    setNameRoom
  } = useTriviaContext();
  const { errorToast, infoToast } = useNotificaiones();
  const { setErrorMensajeScreen } = useErrorScreen();
  const { user, setUser } = useTriviaContext();
  const { quitLoader } = useTriviaListeners();
  const navigate = useNavigate();
  const { setLoaderScreen, setErrorScreen } = useContext(AppContext);
  const { searchTextByKey } = useTextos();

  const setLoader = (show: boolean) => {
    setTimeout(() => {
      setLoaderScreen(show);
    }, 2000);
  };

  const getTriviaById = async (id?: string, user?: any) => {
    // console.log(socket?.connected);
  
    const handleTriviaData = async (data: any) => {
      console.log(data);
      let { trivia, triviaIniciada, triviaFinalizada, nameRoom } = data;
  
      if (data.hasOwnProperty("err")) {
        setErrorMensajeScreen("err.trivia.notfound");
        return Promise.reject(data.err);
      } else {
        if (triviaIniciada) {
          infoToast(searchTextByKey("inf.trivia.iniciada"));
          try {
            let resReloadTrivia = await handleReload(trivia, user);
            console.log(resReloadTrivia);
            navigate(`/challenge/${trivia.id}`);
          } catch (error) {
            console.error(error);
            errorToast(searchTextByKey("err.trivia.generic"));
          }
        }
        if (triviaFinalizada) {
          setErrorMensajeScreen(searchTextByKey("err.trivia.finalizada"));
          return Promise.reject();
        }
        setNameRoom(nameRoom)
        const dataTrivia = {
          id: trivia.id,
          name: trivia.name,
          description: trivia.description,
          moderated: trivia.moderated,
          end_date: trivia.end_date,
        };
        const dataToSave = {
          userInfo: user,
          triviaInfo: trivia,
          date: Date.now(),
        };
        localStorage.setItem("lastReloadTime", JSON.stringify(dataToSave));
        setTrivia(dataTrivia);
  
        return Promise.resolve(trivia);
      }
    };
  
    return new Promise((resolve, reject) => {
      socket.emit("get-triviaById", { id: id, user: user }, (data: any) => {
        handleTriviaData(data)
          .then((trivia) => {
            resolve(trivia);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  const startTrivia = async (id?: number | null) => {
    return new Promise((res, rej) => {
      let params = {
          id: id,
          nameRoom: nameRoom
      }
      socket.emit("startTrivia", params , (data: resCall) => {
        console.log(data);
        if (data.status != 200) {
          rej(data.messaje);
        } else {
          console.log(data);
          res(data)
        }
      });
    });
  };

  const handleReload = async (triviaInfo?: any, userInfo?: any, nameRoom?: any) => {
    return new Promise((res, rej) => {
      let params = {
        username: userInfo.username,
        nameRoom: nameRoom
      };
      setTrivia(triviaInfo);
      setUser(userInfo);
      setNameRoom(nameRoom)
      socket.emit("ReloadTrivia", params, (response: any) => {
          console.log(response);
          if (response.status != 200) {
            rej({status: response.status, message: "Hubo un problema al cargar la trivia"})
          } else {
            if (Object.keys(response.data).length === 0) {
              setLoader(false);
            } else {
              let {data} = response;
              console.log(data);
              //data de la trivia en gral
              setAnswers(data.challenge);
              setMoreQuestions(data.moreQuestions);
              setEstadoPregunta(data.estadoPregunta);
              setEstadoTrivia(data.estadoTrivia)
              setBlockAnswers(data.blockAnswers);
              setFirstData(true);

              //seteo data de la trivia cuando todavia puede responeder
              setAnsSelected(data.ansSelected);
              
              //seteo data de la trivia cunado muestra las respuestas
              setCantResUsers(data.cantResUsers);
              setCantResCorrectas(data.cantResCorrectas);
              let arrCantOpciones: string[] = Object.keys(data.cantRespuestas);
              let arrCantResOpciones: any[] = Object.values(data.cantRespuestas);
              setCantOpciones(arrCantOpciones);
              setCantResOpciones(arrCantResOpciones);

              const dataUser = user;
              data.resRespuestas.map((userRes: any) => {
                if (userRes.id == user.username) {
                  setWonScore(userRes.score);
                  dataUser.score = +userRes.score;
                  setUser(dataUser);
                  setCorrectAnswer(userRes.correctAnswer);
                }
              });
              res({status: response.status, message: "La trivia se cargo correctamente"})
              setLoader(false);
            }
          }
      });
    });
  };

  const sendAnsSelected = (ans?: number) => {
    socket.emit("ansSelected", {
      userName: user.username,
      nameRoom: nameRoom,
      res: ans,
    }, (res: any)=>{
      console.log(res)
      //TODO Manejar correctamente este error
    });
  };

  const ValidarPregunta = () => {
    socket.emit("validarPreguntas", {
      nameRoom: nameRoom
    }, (data: any)=>{
      console.log(data);
      //TODO Manejar correctamente este error
    });
  };

  const nextChallenge = () => {
    socket.emit("nextChallenge", {
      nameRoom: nameRoom
    }, (data: any) => {
      //TODO Manejar correctamente este error
      console.log(data);
    });
  };

  const EndTrivia = () => {
    socket.emit("endTrivia", {
      nameRoom: nameRoom
    }, (data: any) => {
      console.log("sagarnaga");
      //TODO Manejar correctamente este error
    });
  };

  return {
    getTriviaById,
    startTrivia,
    sendAnsSelected,
    ValidarPregunta,
    nextChallenge,
    EndTrivia,
    handleReload,
  };
};

export default useTrivia;
