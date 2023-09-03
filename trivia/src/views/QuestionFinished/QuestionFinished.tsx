import Answers from "../../components/Answers/Answers";
import AnswersSelected from "../../components/InfoChallengeChart/InfoChallengeChart";
import SimpleButton from "../../components/Buttons/SimpleButton";
import CorrectAnswers from "../../components/CorrectAnswers/CorrectAnswers";
import InfoChallenge from "../../components/InfoChallenge/InfoChallenge";
import Layout from "../../components/Layout/Layout";
import "./QuestionFinished.scss";
import InfoChallengeChart from "../../components/InfoChallengeChart/InfoChallengeChart";
import { useTriviaContext } from "../../Contexts/TriviaContext";
import useTrivia from "../../hooks/useTrivia";

function QuestionFinished() {
  const {
    moreQuestions,
    cantResUsers,
    countUsersConected,
    cantResCorrectas,
    cantOpciones,
    cantResOpciones,
  } = useTriviaContext();

  const { nextChallenge, EndTrivia, ValidarPregunta } = useTrivia();

  const handleNextChallenge = () => {
    nextChallenge();
  };

  const handleEndTrivia = () => {
    EndTrivia();
  };

  return (
    <Layout>
      <div className="cont-question-finished">
        <div className="cont-question-finished-data">
          <InfoChallenge
            text="Respondieron:"
            value={`${cantResUsers} / ${countUsersConected - 1}`}
            className={"cont-data-blue respondieron"}
          />
          <InfoChallengeChart
            opciones={cantOpciones}
            respuestas={cantResOpciones}
          />
          <InfoChallenge
            text="Respondieron bien:"
            value={`${cantResCorrectas} / ${cantResUsers}`}
            className={"cont-data-blue respondieronBien"}
          />
        </div>
        <SimpleButton
          onClick={() => {
            if (moreQuestions) {
              handleNextChallenge();
            } else {
              handleEndTrivia();
            }
          }}
          className="btn btn-siguiente"
        >
          {moreQuestions ? "Siguiente" : "Finalizar trivia"}
        </SimpleButton>
      </div>
    </Layout>
  );
}

export default QuestionFinished;
