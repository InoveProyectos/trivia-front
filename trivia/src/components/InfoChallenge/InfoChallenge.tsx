import { IconButton } from "@mui/material";
import "./InfoChallenge.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface intInfoChallenge {
  text?: string;
  value?: string | number;
  className?: string;
  infoAyuda?: boolean;
  textInfoAyuda?: string;
}

function InfoChallenge({
  text,
  value,
  className,
  infoAyuda,
  textInfoAyuda,
}: intInfoChallenge) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`cont-data ${className}`}>
      {infoAyuda && (
        <>
          <IconButton className="btn-info" onClick={handleClick}>
            <InfoOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>{textInfoAyuda}</Typography>
          </Popover>
        </>
      )}
      <div>
        <p>{text}</p>{" "}
      </div>
      <div>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default InfoChallenge;
