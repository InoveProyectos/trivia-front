import SimpleButton from "../../components/Buttons/SimpleButton";
import CorrectAnswers from "../../components/CorrectAnswers/CorrectAnswers";
import InfoChallenge from "../../components/InfoChallenge/InfoChallenge";
import Layout from "../../components/Layout/Layout";
import SpecialLayout from "../../components/Layout/SpecialLayout";
import "./Challengefinished.scss";
function Challengefinished() {
  return (
    <SpecialLayout>
      <div className="cont-challenge-finished">
        <div className="cont-challenge-finished-data">
          <InfoChallenge
            text="Respondiste correctamente"
            value="5/5"
            className={"cont-data-blue"}
          />
          <InfoChallenge
            text="Experiencia"
            value="+ 500"
            className={"cont-data-blue"}
            infoAyuda={true}
            textInfoAyuda={"La experiencia ..."}
          />
          <InfoChallenge
            text="Bonus"
            value="+ 200"
            className={"cont-data-blue"}
            infoAyuda={true}
            textInfoAyuda={"Los puntos bonus ..."}
          />
        </div>
        <SimpleButton onClick={() => {}} className="btn btn-volver">
          Volver
        </SimpleButton>
      </div>
    </SpecialLayout>
  );
}

export default Challengefinished;
