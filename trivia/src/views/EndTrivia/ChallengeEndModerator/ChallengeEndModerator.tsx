import SimpleButton from "../../../components/Buttons/SimpleButton";
import InfoChallenge from "../../../components/InfoChallenge/InfoChallenge";
import SpecialLayout from "../../../components/Layout/SpecialLayout";
import "../Challengefinished.scss";
function ChallengeEndModerator() {
  return (
    <SpecialLayout>
      <div className="cont-challenge-finished">
        <div className="cont-challenge-finished-data">
          <InfoChallenge
            text="Respondieron bien"
            value="5/5"
            className={"cont-data-blue"}
          />
        </div>
      </div>
    </SpecialLayout>
  );
}

export default ChallengeEndModerator;
