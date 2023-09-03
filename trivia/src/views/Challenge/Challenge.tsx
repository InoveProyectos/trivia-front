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
import ChallengeModerator from "./ChallengeModerator/ChallengeModerator";
import ChallengeContestant from "./ChallengeContestant/ChallengeContestant";
import QuestionFinished from "../QuestionFinished/QuestionFinished";

function Challenge() {
  const {
    user,
    estadoPregunta,
  } = useTriviaContext();
  

  if (user.is_staff) {
    if (estadoPregunta == 2) {
      return <QuestionFinished />;
    } else {
      return <ChallengeModerator />;
    }
  } else {
    return <ChallengeContestant />;
  }

}

export default Challenge;
