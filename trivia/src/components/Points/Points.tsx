import { intPoints } from "../../interfaces";
import "./Points.scss";
function Points({ points }: intPoints) {
  return (
    <div className="points">
      <p>Puntos:</p>
      <span>{points}</span>
    </div>
  );
}

export default Points;
