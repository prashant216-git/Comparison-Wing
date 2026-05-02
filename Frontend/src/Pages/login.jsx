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
        title: "Welcome Back ✈️",
        text: "Login successful",
        icon: "success",
      }).then(() => navigate("/homepage"));

    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid username or password",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* CARD */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:block bg-gradient-to-br from-blue-600 to-indigo-600 relative">

          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1529070538774-1843cb3265df')] bg-cover bg-center" />

          <div className="relative h-full flex flex-col justify-center items-center text-white p-10">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-blue-100 mt-2 text-center">
              Continue your journey with Compare Wings
            </p>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 flex flex-col justify-center">

          {/* HEADER */}
          <h2 className="text-3xl font-bold text-slate-800">
            Sign In
          </h2>

          <p className="text-slate-500 text-sm mt-1 mb-6">
            Access your flight dashboard
          </p>

          {/* FORM */}
          <form className="space-y-4" onSubmit={formsubmit}>

            {/* USERNAME */}
            <input
              name="username"
              value={value.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 outline-none transition"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                name="password"
                value={value.password}
                onChange={handleChange}
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 outline-none transition pr-12"
              />

              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-3 text-slate-500 text-sm"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition"
            >
              Sign In
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-sm text-center mt-6 text-slate-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}