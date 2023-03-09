import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface intButtonCopy {
  id: string;
}

function ButtonCopy({ id }: intButtonCopy) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const text = element.textContent;
    if (!text) {
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <IconButton onClick={handleCopy}>
      {copied ? (
        <CheckCircleIcon sx={{ color: "#fff" }} />
      ) : (
        <FileCopyIcon sx={{ color: "#fff" }} />
      )}
    </IconButton>
  );
}

export default ButtonCopy;
