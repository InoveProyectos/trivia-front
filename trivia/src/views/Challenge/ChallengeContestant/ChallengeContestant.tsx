import { useEffect, useState } from "react";
import Answer from "../../../components/Answer/Answer";
import ButtonConfetti from "../../../components/ButtonConfetti/ButtonConfetti";
import Layout from "../../../components/Layout/Layout";
import Points from "../../../components/Points/Points";
import Statement from "../../../components/Statement/Statement";
import Timmer from "../../../components/Timmer/Timmer";
import { useTriviaContext } from "../../../Contexts/TriviaContext";
import useTrivia from "../../../hooks/useTrivia";
import "../Challenge.scss";
import Wating from "../../Wating/Wating";

function ChallengeContestant() {
  const {
    answers,
    user,
    wonScore,
    estadoPregunta,
    ansSelected,
    correctAnswer,
    setAnsSelected,
  } = useTriviaContext();

  const { sendAnsSelected } = useTrivia();
  const [showScore, setShowScore] = useState<boolean | undefined>(false);
  const [showConfetti, setShowConfetti] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (estadoPregunta == 2) {
      if (wonScore != 0) {
        setShowScore(true);
        setShowConfetti(true);
      } else {
        setShowScore(false);
        setShowConfetti(false);
      }
    }
  }, [wonScore]);

  const handleSelected = (num?: number) => {
    setAnsSelected(num);
    sendAnsSelected(num);
  };

  return (
    <Layout className="contenedorPP-challenge contenedorPP-challengeContestant">
      <div className="cont-challenge">
        <div className="child">
          <Timmer initialTime={20} />
          <Points points={user.score} />
        </div>
        <div className="chlid-2">
          <Statement ask={answers.description} remember={answers.name} />
          <div className="cont-answers">
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
        {/* {estadoPregunta == 2 ? <Wating /> : null} */}
        {showScore ? <ButtonConfetti showConfetti={showConfetti} /> : null}
      </div>
    </Layout>
  );
}

export default ChallengeContestant;
