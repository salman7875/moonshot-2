import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authRequest } from "../utils/apiRequest";

const Signup = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const redirectUrl = params.get("redirect") || "/home";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await authRequest("signup", formData);
      if (!data.success) {
        throw new Error("Something went wrong! while signin in!");
      }
      navigate(redirectUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="h-screen bg-slate-300 flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-[90vw] h-fit space-y-4 bg-white border border-slate-400 p-4 rounded-lg shadow-sm"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="p-2 bg-transparent border border-black rounded-md outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 bg-transparent border border-black rounded-md outline-none"
          />
        </div>
        <p>
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
            replace
            className="text-blue-800 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-500 px-8 py-2 rounded-lg text-white text-lg font-semibold cursor-pointer hover:opacity-80"
          >
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
