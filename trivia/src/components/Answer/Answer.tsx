import SimpleButton from "../Buttons/SimpleButton";
import { useState } from "react";
import { intAnswer } from "../../interfaces";
import "./Answer.scss";

function Answer({ ans, onSelected }: intAnswer) {
  const estados = {
    0: "answer-selected",
    1: "answer-nonselected",
    2: "answer-failed",
    3: "answer-success",
  };

  return (
    <SimpleButton className="answer" onClick={() => onSelected(4)}>
      {ans}
    </SimpleButton>
  );
}

export default Answer;
