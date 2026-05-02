import React, { useState, useRef } from "react";
import api from "../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("emaill");
  const password = localStorage.getItem("password");
  const username = localStorage.getItem("username");

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullOtp = otp.join("");

    try {
      const payload = {
        username,
        password,
        email,
        otp: fullOtp,
      };

      await api.post("/signup", payload);

      Swal.fire({
        title: "Verified ✈️",
        text: "Account created successfully",
        icon: "success",
      });

      navigate("/login");

    } catch (err) {
      Swal.fire({
        title: "Invalid OTP",
        text: err?.response?.data || "Verification failed",
        icon: "error",
      });
    }
  };

  const resendOtp = async () => {
    try {
      await api.post("/auth/send-otp", {
        email,
        username,
      });

      Swal.fire({
        title: "OTP Resent",
        icon: "success",
      });

    } catch {
      Swal.fire({
        title: "Error",
        text: "Could not resend OTP",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Verify OTP
        </h1>

        <p className="text-sm text-slate-500 text-center mt-2">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP INPUTS */}
        <form onSubmit={handleSubmit} className="mt-8">

          <div className="flex justify-between gap-2">

            {otp.map((val, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={val}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition shadow-sm focus:shadow-md"
              />
            ))}

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-6 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition"
          >
            Verify Account
          </button>

        </form>

        {/* RESEND */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Didn’t receive code?{" "}
          <span
            onClick={resendOtp}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Resend OTP
          </span>
        </p>

        {/* BACK */}
        <p
          onClick={() => navigate(-1)}
          className="text-center text-sm text-slate-400 mt-4 cursor-pointer hover:text-slate-600"
        >
          Go Back
        </p>

      </div>
    </div>
  );
}