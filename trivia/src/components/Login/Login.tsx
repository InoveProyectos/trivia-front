import React, { ChangeEvent, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import useTrivia from "../../hooks/useTrivia";
import { intTrivia } from "../../interfaces";
import SimpleButton from "../Buttons/SimpleButton";
import Input from "./Input";
import "./Login.scss";

function Login() {
  const [codigoJuego, setCodigoJuego] = useState<string>("");
  const { getTriviaById } = useTrivia();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeCodigoJuego = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoJuego(e.target.value);
  };

  const handleSubmit = () => {
    console.log("llego al submit");
    setIsLoading(true);

    const res = getTriviaById(codigoJuego);

    setIsLoading(false);

    console.log(res);

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
        {isLoading ? (
          <div className="btn-loader">
            <TailSpin
              height="30"
              width="30"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="2"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          "Ingresar"
        )}
      </SimpleButton>
    </div>
  );
}

export default Login;
