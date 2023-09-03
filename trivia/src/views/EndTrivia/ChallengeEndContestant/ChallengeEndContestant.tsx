import { useTriviaContext } from "../../../Contexts/TriviaContext";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import InfoChallenge from "../../../components/InfoChallenge/InfoChallenge";
import SpecialLayout from "../../../components/Layout/SpecialLayout";
import "../Challengefinished.scss";
function ChallengeEndContestand() {
  const {
    cantResCorrectas,
  } = useTriviaContext();
  return (
    <SpecialLayout>
      <div className="cont-challenge-finished">
        <div className="cont-challenge-finished-data">
          <InfoChallenge
            text="Respondiste correctamente"
            value={`${cantResCorrectas}`}
            className={"cont-data-blue"}
          />
          <InfoChallenge
            text="Bonus total ganado"
            value="+ 200"
            className={"cont-data-blue"}
            infoAyuda={true}
            textInfoAyuda={"Los puntos bonus ..."}
          />
        </div>
      </div>
    </SpecialLayout>
  );
}

export default ChallengeEndContestand;
