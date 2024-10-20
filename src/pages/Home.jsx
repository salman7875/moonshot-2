import { useEffect, useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

import Header from "../components/Header";
import Filter from "../components/Filter";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
  zoomPlugin
);

const Home = () => {
  const [chartData, setChartData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const handleSetFilterData = (data) => {
    setFilterData(data);
  };

  const handleChart = (data) => {
    setChartData(data);
  };

  return (
    <main className="h-screen bg-slate-100 w-screen overflow-y-scroll">
      <Header />
      <Filter handleChartData={handleChart} />
      <div className="flex flex-col items-center gap-4 px-4 lg:flex-row lg:gap-8 lg:px-8">
        <section className="h-fit lg:w-[45vw] w-full">
          <BarChart
            chartData={chartData}
            handleSetFilterData={handleSetFilterData}
          />
        </section>
        {filterData.length > 0 && (
          <section className="w-full h-fit lg:w-[45vw]">
            <LineChart filterData={filterData} />
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
