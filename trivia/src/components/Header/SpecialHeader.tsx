import "./Header.scss";
import imgLogoTrivia from "../../assets/img/TriviaEndLogo.svg";
import imgWaveFinal from "../../assets/img/Wave-final.svg";
import "./SpecialHeader.scss";
function SpecialHeader() {
  return (
    <div className="special-header">
      <img alt="trivia" className="img-logo-trivia" src={imgLogoTrivia} />
      <img alt="wave" src={imgWaveFinal} />
    </div>
  );
}

export default SpecialHeader;
