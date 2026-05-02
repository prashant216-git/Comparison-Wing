import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: form.email,
        username: form.username,
      };

      await api.post("/auth/send-otp", payload);

      localStorage.setItem("email", form.email);
      localStorage.setItem("username", form.username);
      localStorage.setItem("password", form.password);

      Swal.fire({
        title: "OTP Sent ✈️",
        text: "Check your email for verification code",
        icon: "success",
      }).then(() => {
        navigate("/OtpVerification", {
          state: form,
        });
      });

    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error?.response?.data ||
          "Something went wrong while sending OTP",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* CARD */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">

        {/* LEFT PANEL */}
        <div className="hidden md:flex bg-gradient-to-br from-indigo-600 to-blue-600 items-center justify-center p-10 text-white">

          <div className="text-center">
            <h1 className="text-3xl font-bold">Join Compare Wings</h1>
            <p className="text-blue-100 mt-2">
              Start your journey with smarter flight booking
            </p>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 text-sm mt-1 mb-6">
            Sign up to explore best flight deals
          </p>

          <form className="space-y-4" onSubmit={sendOtp}>

            {/* USERNAME */}
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 outline-none transition"
            />

            {/* EMAIL */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-400 outline-none transition"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 focus:border-blue-400 outline-none transition"
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
              Send OTP
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-center mt-6 text-slate-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}