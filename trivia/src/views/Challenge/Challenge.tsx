import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Answer from "../../components/Answer/Answer";
import ButtonConfetti from "../../components/ButtonConfetti/ButtonConfetti";
import SimpleButton from "../../components/Buttons/SimpleButton";
import Layout from "../../components/Layout/Layout";
import Points from "../../components/Points/Points";
import Statement from "../../components/Statement/Statement";
import Timmer from "../../components/Timmer/Timmer";
import { useTriviaContext } from "../../Contexts/TriviaContext";
import useTrivia from "../../hooks/useTrivia";
import LoadScreen from "../LoadScreen/LoadScreen";
import "./Challenge.scss";
import StudentAnswers from "../../components/StudentAnswers/StudentAnswers";
import { AppContext } from "../../Contexts/AppContext";

function Challenge() {
  const { trivia, answers, user, idChallengeActual, correctAnswer } =
    useTriviaContext();
  const idChallegeNum = idChallengeActual;
  const [ansSelected, setAnsSelected] = useState<number>();
  const { nextChallenge, finishTrivia, sendAnsSelected, ValidarPregunta } =
    useTrivia();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const { setLoaderScreen, setErrorScreen } = useContext(AppContext);

  const handleSelected = (num?: number) => {
    setAnsSelected(num);
    sendAnsSelected(num);
  };

  console.log({ ansSelected }, { answers }, { user }, { idChallengeActual });

  //TODO  Comentado hasta que termine de hacer la funcion que validar pregunta
  // const handleNextChallenge = (id?: number, idChallegeNum?: number) => {
  //   console.log("Siguiente challenge");
  //   nextChallenge(id, idChallegeNum);

  //   setShowLoading(true);
  //   setTimeout(() => {
  //     setShowLoading(false);
  //     console.log("sacando loading page");
  //   }, 3000);

  //   //Siempre que el profesor haga click en siguiente le manda al back una orden para que le diga a todos que se tienen que pasar al sig step, mandandole la orden que muestre un loading page
  // };

  const handleFinishQuestion = async () => {
    ValidarPregunta();
    //Muestra las preguntas correctas y las incorrectas
  };

  return (
    <Layout className="contenedorPP-challenge">
      <div className="cont-challenge">
        <div className="child">
          <Timmer initialTime={20} />
          <Points points={2000} />
        </div>
        <div className="chlid-2">
          <Statement ask={answers.description} remember={answers.name} />
          <div className="cont-answers">
            <StudentAnswers />
            {answers.options.map((answ) => {
              return (
                <Answer
                  ansSelected={ansSelected}
                  ans={answ}
                  onSelected={handleSelected}
                  disable={user.is_staff ? user.is_staff : undefined}
                  correctAnswer={correctAnswer}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="control-btn">
        {user.is_staff ? (
          <SimpleButton
            onClick={() => {
              handleFinishQuestion();
            }}
            className="btn-continue"
          >
            Finalizar pregunta
          </SimpleButton>
        ) : null}
        {/* {user.is_staff ? (
          <SimpleButton
            onClick={() => {
              handleNextChallenge(trivia.id);
            }}
            className="btn-continue"
          >
            Siguiente
          </SimpleButton>
        ) : (
          <ButtonConfetti />
        )} */}
      </div>
    </Layout>
  );
}

export default Challenge;
