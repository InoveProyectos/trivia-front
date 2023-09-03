import Answer from "../../../components/Answer/Answer";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import Layout from "../../../components/Layout/Layout";
import Statement from "../../../components/Statement/Statement";
import Timmer from "../../../components/Timmer/Timmer";
import { useTriviaContext } from "../../../Contexts/TriviaContext";
import useTrivia from "../../../hooks/useTrivia";
import "../Challenge.scss";
import StudentAnswers from "../../../components/StudentAnswers/StudentAnswers";

function ChallengeModerator() {
  const {
    answers,
    estadoPregunta,
    cantResUsers,
    countUsersConected,
  } = useTriviaContext();

  const {ValidarPregunta } = useTrivia();

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

  return (
    <Layout className="contenedorPP-challenge">
      <div className="cont-challenge">
        <div className="child">
          <Timmer initialTime={20} />
        </div>
        <div className="chlid-2">
          <Statement ask={answers.description} remember={answers.name} />
          <StudentAnswers
            usersInRoom={countUsersConected}
            cantRes={cantResUsers}
          />
          <div className="cont-answers">
            {answers.options.map((answ) => {
              return <Answer ans={answ} disable={true} />;
            })}
          </div>
        </div>
      </div>
      <div className="control-btn">{getButtonByState[estadoPregunta]}</div>
    </Layout>
  );
}

export default ChallengeModerator;
