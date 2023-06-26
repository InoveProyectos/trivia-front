import { useContext, useEffect, useState } from "react";
import Answer from "../../components/Answer/Answer";
import ButtonConfetti from "../../components/ButtonConfetti/ButtonConfetti";
import SimpleButton from "../../components/Buttons/SimpleButton";
import Layout from "../../components/Layout/Layout";
import Points from "../../components/Points/Points";
import Statement from "../../components/Statement/Statement";
import Timmer from "../../components/Timmer/Timmer";
import { useTriviaContext } from "../../Contexts/TriviaContext";
import useTrivia from "../../hooks/useTrivia";
import "./Challenge.scss";
import StudentAnswers from "../../components/StudentAnswers/StudentAnswers";
import { AppContext } from "../../Contexts/AppContext";

function Challenge() {
  const {
    trivia,
    answers,
    user,
    // idChallengeActual,
    wonScore,
    estadoTrivia,
    estadoPregunta,
    moreQuestions,
    cantResUsers,
    countUsersConected,
    ansSelected,
    correctAnswer,
    setCorrectAnswer,
    setAnsSelected,
  } = useTriviaContext();
  // const idChallegeNum = idChallengeActual;

  const { nextChallenge, finishTrivia, sendAnsSelected, ValidarPregunta } =
    useTrivia();
  // const [showLoading, setShowLoading] = useState<boolean>(false);
  // const { setLoaderScreen, setErrorScreen } = useContext(AppContext);
  const [showScore, setShowScore] = useState<boolean | undefined>(false);
  const [showConfetti, setShowConfetti] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (wonScore != undefined) {
      if (wonScore != 0) {
        setCorrectAnswer(ansSelected);
        setShowScore(true);
        setShowConfetti(true);
      } else {
        setCorrectAnswer(undefined); //TODO Setear aca con el ans correcto
        setShowScore(true);
        setShowConfetti(false);
      }
    }
  }, [wonScore]);

  useEffect(() => {
    console.log({ estadoTrivia });
    console.log({ estadoPregunta });
  });

  const handleSelected = (num?: number) => {
    setAnsSelected(num);
    sendAnsSelected(num);
  };

  console.log({ ansSelected }, { answers }, { user });

  //TODO  Comentado hasta que termine de hacer la funcion que validar pregunta
  const handleNextChallenge = () => {
    nextChallenge();
  };

  const handleFinishQuestion = async () => {
    ValidarPregunta();
    //Muestra las preguntas correctas y las incorrectas
  };

  //TODO ver como hacer para que al desconectarse en medio de la pregunta no se quede cargando y te lleve a la pregunta
  //TODO ver como hacer para que cambien las funciones con un mismo boton

  const handleFinishTrivia = () => {
    finishTrivia();
  };

  const getButtonByState: Record<number, any> = {
    0: (
      <SimpleButton onClick={() => {}} className="btn-continue" disabled={true}>
        Esperando respuestas
      </SimpleButton>
    ),
    1: (
      <SimpleButton onClick={handleFinishQuestion} className="btn-continue">
        Terminar Pregunta
      </SimpleButton>
    ),
    2: (
      <SimpleButton
        onClick={() => {
          if (moreQuestions) {
            handleNextChallenge();
          } else {
            handleFinishTrivia();
          }
        }}
        className="btn-continue"
      >
        {moreQuestions ? "Siguiente pregunta" : "Finalizar trivia"}
      </SimpleButton>
    ),
  };

  return (
    <Layout className="contenedorPP-challenge">
      <div className="cont-challenge">
        <div className="child">
          <Timmer initialTime={20} />
          <Points points={user.score} />
        </div>
        <div className="chlid-2">
          <Statement ask={answers.description} remember={answers.name} />
          <div className="cont-answers">
            <StudentAnswers
              usersInRoom={countUsersConected}
              cantRes={cantResUsers}
            />
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
          getButtonByState[estadoPregunta]
        ) : showScore ? (
          <ButtonConfetti showConfetti={showConfetti} />
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
