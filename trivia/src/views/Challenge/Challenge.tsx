import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Answer from "../../components/Answer/Answer";
import ButtonConfetti from "../../components/ButtonConfetti/ButtonConfetti";
import SimpleButton from "../../components/Buttons/SimpleButton";
import Layout from "../../components/Layout/Layout";
import Points from "../../components/Points/Points";
import Statement from "../../components/Statement/Statement";
import Timmer from "../../components/Timmer/Timmer";
import { useTriviaContext } from "../../Contexts/AppContext";
import useTrivia from "../../hooks/useTrivia";
import LoadScreen from "../LoadScreen/LoadScreen";
import "./Challenge.scss";

function Challenge() {
  const { answers, user, idChallengeActual } = useTriviaContext();
  const { id } = useParams();
  const idChallegeNum = idChallengeActual;
  const [ansSelected, setAnsSelected] = useState<number>();
  const { nextChallenge, finishTrivia } = useTrivia();
  const [showLoading, setShowLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log("Cambio el challenge actual");
  //   console.log("Llamar al loading page");
  //   setShowLoading(true);
  //   setTimeout(() => {
  //     setShowLoading(true);
  //     console.log("sacando loading page");
  //   }, 3000);
  // }, [idChallengeActual]);

  const handleSelected = (num: number | undefined) => {
    setAnsSelected(num);
  };

  console.log({ ansSelected }, { answers }, { user }, { idChallengeActual });

  const handleNextChallenge = (id?: string, idChallegeNum?: number) => {
    console.log("Siguiente challenge");
    nextChallenge(id, idChallegeNum);

    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      console.log("sacando loading page");
    }, 3000);

    //Siempre que el profesor haga click en siguiente le manda al back una orden para que le diga a todos que se tienen que pasar al sig step, mandandole la orden que muestre un loading page
  };

  const handleFinish = () => {
    console.log("finalizo el challenge");
  };

  return (
    <>
      {!showLoading ? (
        <Layout>
          <div className="cont-challenge">
            <div className="child">
              <Timmer initialTime={20} />
              <Points points={2000} />
            </div>
            <div className="chlid-2">
              <Statement
                ask={answers[idChallegeNum].description}
                remember={answers[idChallegeNum].name}
              />
              <div className="cont-answers">
                {answers[idChallegeNum].options.map((answ) => {
                  return (
                    <Answer
                      ansSelected={ansSelected}
                      ans={answ}
                      onSelected={handleSelected}
                      disable={user.is_staff ? user.is_staff : undefined}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              {user.is_staff ? (
                <SimpleButton
                  onClick={() => {
                    answers[idChallegeNum + 1]
                      ? handleNextChallenge(id, idChallegeNum)
                      : handleFinish;
                  }}
                >
                  {answers[idChallegeNum + 1] ? "Siguente" : "Finalizar"}
                </SimpleButton>
              ) : (
                <ButtonConfetti />
              )}
            </div>
          </div>
        </Layout>
      ) : (
        <LoadScreen />
      )}
    </>
  );
}

export default Challenge;
