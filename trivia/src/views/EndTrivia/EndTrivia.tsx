import { useTriviaContext } from "../../Contexts/TriviaContext";
import ChallengeEndModerator from "./ChallengeEndModerator/ChallengeEndModerator";
import ChallengeEndContestand from "./ChallengeEndContestant/ChallengeEndContestant";

function EndTrivia() {
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

  if (user.is_staff) {
    return <ChallengeEndModerator />;
  } else {
    return <ChallengeEndContestand />;
  }
}

export default EndTrivia;
