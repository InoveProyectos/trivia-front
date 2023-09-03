import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./InfoChallengeChart.scss";
import { infoChallengeChart } from "../../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

function InfoChallengeChart({ opciones, respuestas }: infoChallengeChart) {
  const data = {
    labels: opciones,
    datasets: [
      {
        label: "Respuestas",
        data: respuestas,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="cont-data cont-data-blue cont-data-with-doughnut">
      <div>
        <p>Respuestas elegidas:</p>
      </div>
      <div className="cont-doughnut">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default InfoChallengeChart;
