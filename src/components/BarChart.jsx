import { Bar } from "react-chartjs-2";
import { sumTotalChartData } from "../utils/utlis";

const BarChart = ({ chartData, handleSetFilterData }) => {
  const totalData = sumTotalChartData(chartData);

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const elementIndex = elements[0].index;
      const category = barChartData.labels[elementIndex];
      const newData = chartData.map((data) => ({
        value: data[category],
        day: data.day,
      }));
      handleSetFilterData(newData);
    }
  };

  const barChartData = {
    labels: [...Object.keys(totalData)],
    datasets: [
      {
        label: "Total Data",
        data: [...Object.values(totalData)],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
      y: {
        title: {
          display: true,
          text: "Categories (A-F)",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    onClick: (event, elements) => handleClick(event, elements),
  };

  return <Bar data={barChartData} options={barOptions} />;
};

export default BarChart;
