import { intStatement } from "../../interfaces";
import "./Statement.scss";

function Statement({ ask, remember }: intStatement) {
  return (
    <div className="cont-statement">
      <div className="statement">
        <p>{ask}</p>
        <span>{remember}</span>
      </div>
    </div>
  );
}

export default Statement;
