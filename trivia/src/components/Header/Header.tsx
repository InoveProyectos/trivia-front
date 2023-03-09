import "./Header.scss";
import imgLogoTrivia from "../../assets/img/TriviaLogo.svg";

function Header() {
  return (
    <div className="header">
      <img alt="trivia" src={imgLogoTrivia} />
    </div>
  );
}

export default Header;
