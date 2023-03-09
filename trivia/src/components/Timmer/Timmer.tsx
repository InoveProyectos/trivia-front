import React, { useEffect, useState } from "react";
import { intTimmer } from "../../interfaces";

function Timmer({ initialTime }: intTimmer) {
  const [time, setTime] = useState<number>(initialTime);

  const style = {
    padding: "0.3rem 0.5rem",
    width: "fit-content",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "4px",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="timmer" style={style}>
      <p>00:{time < 10 ? "0" + time : time}</p>
    </div>
  );
}

export default Timmer;
