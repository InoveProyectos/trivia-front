import ShareIcon from "@mui/icons-material/Share";

import "./ButtonShare.scss";
function ButtonShare() {
  const handleShare = () => {
    navigator.share({
      title: "Compartir URL",
      url: "http://127.0.0.1:5173/lobby",
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
