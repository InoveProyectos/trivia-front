import ShareIcon from "@mui/icons-material/Share";
import { intRoomData } from "../../interfaces";
import "./ButtonShare.scss";

function ButtonShare({ roomCode }: intRoomData) {
  const handleShare = () => {
    navigator.share({
      title: "Compartir URL",
      url: `http://127.0.0.1:5173/lobby/${roomCode}`,
    });
  };

  return (
    <button className="btn btn-share" onClick={handleShare}>
      <ShareIcon />
      Compartir
    </button>
  );
}

export default ButtonShare;
