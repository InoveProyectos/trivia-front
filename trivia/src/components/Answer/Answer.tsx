import SimpleButton from "../Buttons/SimpleButton";
import { useState } from "react";
import { intAnswerCom } from "../../interfaces";
import "./Answer.scss";

function Answer({ ansSelected, ans, onSelected, disable }: intAnswerCom) {
  const estados: { [key: number]: string } = {
    0: "answer answer-selected",
    1: "answer answer-nonselected",
    2: "answer answer-failed",
    3: "answer answer-success",
  };

  console.log(ansSelected);

  const getEstado = (num?: number) => {
    if (ansSelected) {
      console.log(num == ansSelected);
      if (num == ansSelected) {
        console.log(estados[0]);
        return estados[0];
      } else {
        return estados[1];
      }
    } else {
      return "answer";
    }
  };

  return (
    <SimpleButton
      className={getEstado(ans.index)}
      onClick={() => onSelected(ans.index)}
      disabled={disable}
    >
      {ans.content}
    </SimpleButton>
  );
}

export default Answer;
