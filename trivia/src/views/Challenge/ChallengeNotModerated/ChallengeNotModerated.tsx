import Answer from "../../../components/Answer/Answer";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import Layout from "../../../components/Layout/Layout";
import Statement from "../../../components/Statement/Statement";
import Timmer from "../../../components/Timmer/Timmer";
import { useTriviaContext } from "../../../Contexts/TriviaContext";
import useTrivia from "../../../hooks/useTrivia";
import "../Challenge.scss";

function ChallengeNotModerated() {
  const {
    answers,
    estadoPregunta,
    ansSelected,
    correctAnswer,
    setAnsSelected,
  } = useTriviaContext();

  const {ValidarPregunta, sendAnsSelected } = useTrivia();

  const handleFinishQuestion = async () => {
    ValidarPregunta();
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
  };

  const handleSelected = (num?: number) => {
    setAnsSelected(num);
    sendAnsSelected(num);
  };

  return (
    <Layout className="contenedorPP-challenge contenedorPP-challengeNotModerated">
      <div className="cont-challenge">
        <div className="child">
          <Timmer initialTime={20} />
        </div>
        <div className="chlid-2">
          <Statement ask={answers.description} remember={answers.name} />
          <div className="cont-answers">
            {answers.options.map((answ) => {
              return <Answer
                ansSelected={ansSelected}
                ans={answ}
                onSelected={handleSelected}
                disable={false}
                correctAnswer={correctAnswer}
              />;
            })}
          </div>
        </div>
      </div>
      <div className="control-btn">{getButtonByState[estadoPregunta]}</div>
    </Layout>
  );
}

export default ChallengeNotModerated;
