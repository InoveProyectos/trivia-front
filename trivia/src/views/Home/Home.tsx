import Login from "../../components/Login/Login";
import triviaLogo from "../../assets/img/TriviaLogo.svg";
import inoveLogo from "../../assets/img/inoveLogo.svg";
import wave from "../../assets/img/Wave.svg";
import "./Home.scss";

function Home() {
  return (
    <div className="container container-home">
      <div className="cont-logo">
        <img alt="trivia" src={triviaLogo} />
        <div className="byInove">
          <span>by</span>
          <img alt="inove" src={inoveLogo} />
        </div>
      </div>
      <div className="wave">
        <img alt="wave" src={wave} />
      </div>
      <div className="cont-login">
        <Login />
      </div>
    </div>
  );
}

export default Home;
