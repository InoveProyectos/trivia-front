import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./InfoChallengeChart.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

function InfoChallengeChart() {
  const data = {
    labels: ["Preg #1", "Preg #2", "Preg #3", "Preg #4"],
    datasets: [
      {
        label: "Respuestas",
        data: [24, 50, 25, 1],
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
