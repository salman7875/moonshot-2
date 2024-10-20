import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import useFetchChart from "../hooks/useFetchChart";
import { localURL } from "../utils/apiRequest";

const getPersistentData = (key) => {
  const data = Cookies.get(key);
  const url = new URL(location);
  const keys = url.searchParams.get(key);

  return keys ? keys : data ? data : "";
};

const Filter = ({ handleChartData }) => {
  const [filters, setFilters] = useState({
    startDate: getPersistentData("startDate"),
    endDate: getPersistentData("endDate"),
    gender: getPersistentData("gender"),
    age: getPersistentData("age"),
  });
  const { data, isLoading, error } = useFetchChart(
    `${localURL}/chart?gender=${filters.gender}&age=${filters.age}&startDate=${filters.startDate}&endDate=${filters.endDate}`
  );

  useEffect(() => {
    handleChartData(data);
  }, [isLoading]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    Cookies.set(name, value);
    const url = new URL(location);
    url.searchParams.set(name, value);
    history.replaceState({}, "", url);
  };

  const handleResetFilter = () => {
    setFilters({ age: "", gender: "", endDate: "", startDate: "" });
  };

  const handleShare = () => {
    const url = new URL(location);
    navigator.clipboard.writeText(url);
    alert("URL Copied to Clipboard you can share it!");
  };

  return (
    <section className="flex flex-col lg:flex-row lg:gap-8 md:flex-row gap-4 p-8 ">
      {isLoading ? <p>Loading...</p> : null}
      <div className="space-x-2 font-semibold text-lg">
        <label htmlFor="startDate">Start Date:-</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="space-x-2 font-semibold text-lg">
        <label htmlFor="endDate">End Date:-</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </div>

      <select
        onChange={handleChange}
        name="age"
        value={filters.age}
        className="px-4 py-1 outline-none border border-black"
      >
        <option value="">-- Select age --</option>
        <option value="15-25">15 - 25</option>
        <option value=">25">{">"}25</option>
      </select>

      <select
        onChange={handleChange}
        name="gender"
        value={filters.gender}
        className="px-4 py-1 outline-none border border-black"
      >
        <option value="">-- Select Gender --</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button
        className="text-lg text-white font-semibold px-6 py-1 bg-teal-500 rounded-lg"
        onClick={handleResetFilter}
      >
        Reset
      </button>
      <button
        className="text-lg text-white font-semibold px-6 py-1 bg-teal-500 rounded-lg"
        onClick={handleShare}
      >
        Share
      </button>
    </section>
  );
};

export default Filter;
