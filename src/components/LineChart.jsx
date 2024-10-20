import { formatLabelDate } from "../utils/utlis";
import { Line } from "react-chartjs-2";

const LineChart = ({ filterData }) => {
  const lineChartData = {
    labels: filterData.map((d) => formatLabelDate(d.day)),
    datasets: [
      {
        label: "Selected Field Data",
        data: filterData.map((d) => d.value),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },
  };
  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;
