import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { localURL } from "../utils/apiRequest";

const Header = () => {
  const navigate = useNavigate();

  const handleGetCookie = async () => {
    try {
      const res = await fetch(`${localURL}/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      Cookies.remove("age");
      Cookies.remove("gender");
      Cookies.remove("startDate");
      Cookies.remove("endDate");
      if (!data.success) {
        throw new Error("Something went wrong!");
      }
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-slate-200 h-[10vh] flex items-center justify-end py-4 px-8">
      <button
        onClick={handleGetCookie}
        className="bg-red-200 text-red-500 font-semibold px-8 py-2 rounded-lg"
      >
        logout
      </button>
    </header>
  );
};

export default Header;
