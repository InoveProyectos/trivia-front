
import { useTriviaContext } from "../../Contexts/TriviaContext";
import "./Challenge.scss";
import ChallengeModerator from "./ChallengeModerator/ChallengeModerator";
import ChallengeContestant from "./ChallengeContestant/ChallengeContestant";
import QuestionFinished from "../QuestionFinished/QuestionFinished";
import ChallengeNotModerated from "./ChallengeNotModerated/ChallengeNotModerated";

function Challenge() {
  const {
    user,
    estadoPregunta,
    trivia,
  } = useTriviaContext();
  
  if(!trivia.moderated){
    if (estadoPregunta == 2) {
      return <QuestionFinished />;
    } else {
      return <ChallengeNotModerated />;
    }
  }else{
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

}

export default Challenge;
