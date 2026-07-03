import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TransactionChart({ data }) {
  const chartData = {
    labels: data.map((_, i) => `Hari ${i + 1}`),
    datasets: [
      {
        label: "Transaksi",
        data: data,
        borderColor: "#4a6cf7",
        backgroundColor: "rgba(74,108,247,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}