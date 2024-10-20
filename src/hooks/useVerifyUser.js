import { useState, useEffect } from "react";

const useVerifyUser = (url) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const verifyUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const resData = await res.json();
      setData(resData.success);
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, [url]);

  return { data, isLoading, error };
};

export default useVerifyUser;
