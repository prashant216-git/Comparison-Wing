import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";

export default function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const formsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signin", value);

      localStorage.setItem("loginjwt", response.data);

      Swal.fire({
        title: "Ready for Takeoff ✈️",
        text: "Login successful",
        icon: "success",
      }).then(() => navigate("/homepage"));

    } catch (error) {
      Swal.fire({
        title: "Boarding Denied ❌",
        text: "Invalid username or password",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-300">

      {/* CARD */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">

        {/* LEFT SIDE (TRAVEL VISUAL) */}
        <div className="hidden md:block relative">

          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502920917128-1aa500764b6e')] bg-cover bg-center" />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-white p-10">
            <h1 className="text-4xl font-bold">Explore the World 🌍</h1>
            <p className="text-blue-100 mt-4 text-center">
              Discover flights, compare prices, and plan your next journey with ease.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back ✈️
          </h2>

          <p className="text-slate-500 text-sm mt-1 mb-6">
            Sign in to continue your travel journey
          </p>

          <form className="space-y-4" onSubmit={formsubmit}>

            <input
              name="username"
              value={value.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition"
            />

            <div className="relative">

              <input
                name="password"
                value={value.password}
                onChange={handleChange}
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition pr-12"
              />

              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-3 text-slate-500 text-sm"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>

            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition"
            >
              Start Exploring ✈️
            </button>

          </form>

          <p className="text-sm text-center mt-6 text-slate-500">
            New traveler?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Create Account
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}