import SimpleButton from "../Buttons/SimpleButton";
import { intAnswerCom } from "../../interfaces";
import "./Answer.scss";
import { useEffect } from "react";
import { useTriviaContext } from "../../Contexts/TriviaContext";

function Answer({
  ansSelected,
  ans,
  onSelected,
  disable,
  correctAnswer,
}: intAnswerCom) {
  const { blockAnswers, estadoPregunta } = useTriviaContext();
  const estados: { [key: number]: string } = {
    0: "answer answer-selected",
    1: "answer answer-nonselected",
    2: "answer answer-failed",
    3: "answer answer-success",
  };

  const getEstado = (num?: number) => {
    if (ansSelected) {
      if (estadoPregunta == 2) {
        if (correctAnswer == num) {
          return estados[3];
        } else {
          return estados[2];
        }
      } else {
        if (num == ansSelected) {
          return estados[0];
        } else {
          return estados[1];
        }
      }
    } else {
      return "answer";
    }
  };

  return (
    <SimpleButton
      className={getEstado(ans.index)}
      onClick={() => {
        if (!blockAnswers) onSelected(ans.index);
      }}
      disabled={disable}
    >
      {ans.content}
    </SimpleButton>
  );
}

export default Answer;
