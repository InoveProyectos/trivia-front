import "./Header.scss";
import imgLogoTrivia from "../../assets/img/TriviaEndLogo.svg";
import imgWaveFinal from "../../assets/img/Wave-final.svg";
import "./SpecialHeader.scss";
function SpecialHeader() {
  return (
    <div className="special-header">
      <img alt="trivia" className="img-logo-trivia-special-header" src={imgLogoTrivia} />
      <img alt="wave" className="wave-special-header" src={imgWaveFinal} />
    </div>
  );
}

export default SpecialHeader;
