import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useTrivia from "../../hooks/useTrivia";
import SimpleButton from "../Buttons/SimpleButton";
import Input from "./Input";
import "./Login.scss";

function Login() {
  const [codigoJuego, setCodigoJuego] = React.useState<string>("");
  const { getTrivia } = useTrivia();
  const navigate = useNavigate();

  const handleChangeCodigoJuego = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoJuego(e.target.value);
  };

  const handleSubmit = () => {
    //TODO realizar el ingreso al lobby
    console.log("llego al submit");

    getTrivia();

    //TODO descomentar esta linea
    // navigate("/lobby");
  };

  return (
    <div className="box-login">
      <Input
        value={codigoJuego}
        onChange={handleChangeCodigoJuego}
        type="number"
        className="inp-login"
        placeholder="Código del juego"
      />
      <SimpleButton onClick={handleSubmit} className="btn-login">
        Ingresar
      </SimpleButton>
    </div>
  );
}

export default Login;
