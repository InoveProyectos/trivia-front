import confetti, { Options } from "canvas-confetti";
import { useEffect } from "react";
import SimpleButton from "../Buttons/SimpleButton";
import "./ButtonConfetti.scss";

function ButtonConfetti() {
  useEffect(() => {
    const intervalId = setInterval(handleClick, 1500);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 6000);
  }, []);

  const handleClick = () => {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: any) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <SimpleButton className="btn btn-confetti" onClick={handleClick}>
      +200 Puntos 🎉
    </SimpleButton>
  );
}

export default ButtonConfetti;
