import Answers from "../../components/Answers/Answers";
import AnswersSelected from "../../components/InfoChallengeChart/InfoChallengeChart";
import SimpleButton from "../../components/Buttons/SimpleButton";
import CorrectAnswers from "../../components/CorrectAnswers/CorrectAnswers";
import InfoChallenge from "../../components/InfoChallenge/InfoChallenge";
import Layout from "../../components/Layout/Layout";
import "./QuestionFinished.scss";
import InfoChallengeChart from "../../components/InfoChallengeChart/InfoChallengeChart";

function QuestionFinished() {
  return (
    <Layout>
      <div className="cont-question-finished">
        <div className="cont-question-finished-data">
          <InfoChallenge
            text="Respondieron"
            value="100/100"
            className={"cont-data-blue"}
          />
          <InfoChallengeChart />
          <InfoChallenge
            text="Respondieron bien"
            value="100/100"
            className="cont-data-blue"
          />
        </div>
        <SimpleButton onClick={() => {}} className="btn btn-siguiente">
          Siguiente
        </SimpleButton>
      </div>
    </Layout>
  );
}

export default QuestionFinished;
