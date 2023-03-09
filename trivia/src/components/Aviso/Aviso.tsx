import "./Aviso.scss";

interface intAviso {
  txt: string;
}

function Aviso({ txt }: intAviso) {
  return <div className="aviso">{txt}</div>;
}

export default Aviso;
