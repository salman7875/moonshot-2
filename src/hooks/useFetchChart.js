import { useEffect, useState } from "react";

const useFetchChart = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();

      if (!resData.success) {
        throw new Error("Something went wrong!");
      }
      console.log(resData, "*************");
      setData(resData.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, error, isLoading };
};

export default useFetchChart;
