import { AppContext, useAppContext } from "../../Contexts/AppContext";
import TriviaConstants from "../../TriviaConstants";
import Header from "../../components/Header/Header";
import "./ErrorScreen.scss";

function ErrorScreen() {
  const { errorMensaje } = useAppContext();
  return (
    <>
      <Header />
      <div className="contenedorPP">
        <div className="errorScreen">
          <img className="error_img" src={TriviaConstants.IMAGES.IMG404} />
          <h3 className="error_txt">{errorMensaje}</h3>
        </div>
      </div>
    </>
  );
}

export default ErrorScreen;
