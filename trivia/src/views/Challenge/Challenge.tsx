import { useState } from "react";
import Answer from "../../components/Answer/Answer";
import ButtonConfetti from "../../components/ButtonConfetti/ButtonConfetti";
import Layout from "../../components/Layout/Layout";
import Points from "../../components/Points/Points";
import Statement from "../../components/Statement/Statement";
import Timmer from "../../components/Timmer/Timmer";
import "./Challenge.scss";

function Challenge() {
  const answers = ["int", "float", "str", "print"];
  const [ansSelected, setAnsSelected] = useState<number>();

  const handleSelected = (num: number) => {
    setAnsSelected(num);
  };

  console.log(ansSelected);

  return (
    <Layout>
      <div className="cont-challenge">
        <div className="child">
          <Timmer initialTime={20} />
          <Points points={2000} />
        </div>
        <div className="chlid-2">
          <Statement
            ask="¿Qué tipo de datos utilizamos para crear números enteros?"
            remember="Recuerde que un entero no lleva coma o punto"
          />
          <div className="cont-answers">
            {answers.map((answ) => {
              return <Answer ans={answ} onSelected={handleSelected} />;
            })}
          </div>
        </div>
        <div>
          <ButtonConfetti />
        </div>
      </div>
    </Layout>
  );
}

export default Challenge;
