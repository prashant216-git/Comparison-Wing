import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
export default function SignUp() {
const[Fullname,setFullname]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[otp,setOtp]=useState("");

const navigate = useNavigate();

const handleSubmit2= async (e)=>{
    e.preventDefault();


    
}


// ✅ Step 3: Submit handler
 

    // const payload = {
    //   username: Fullname,
    //   email: email,
    //   password: password, 
    // };

    // try {
    //   const response = await fetch("https://api.comparewings.world/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json", // bata rahe hain ki JSON bhej rahe
    //     },
    //     body: JSON.stringify(payload), // JS object -> JSON string
    //   });

    //   // Response ka status check karo
    //   if (!response.ok) {
    //     // agar status 200-299 nahi hai
    //     console.error("Signup failed");
    //     return;
    //   }

    //   const result = await response.text(); // API se jo data aaya
    //   console.log("Signup success:", result);
    //   navigate("/verification");  
    //   // yaha pe aap alert bhi dikha sakte ho ya next page pe navigate

    // } 
    // catch (error) {
    //   console.error("Error while calling API:", error);
    // }

  


    // for otp 
     const handleSubmit = async (e) => {
    e.preventDefault();
    const payload2={
      
  email: email,
  username :Fullname
  };
   

  try {
  const otpresponse = await api.post("/auth/send-otp",payload2);

  


      const otpresult = await otpresponse.data; // API se jo data aaya
      console.log(otpresult);
      localStorage.setItem("emaill", email);
      localStorage.setItem("username",Fullname);
      localStorage.setItem("password",password);
      navigate("/OtpVerification",{state:{email,Fullname,password}})}


      
  catch (error){
    const message =
        error?.response?.data ||
        error?.message ||
        "Something Went Wrong";
    
      Swal.fire({
        text: message,
        icon: "warning"
      });
  }
  };


  const [passwordVisible, setPasswordVisible] = useState(false);
 




  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    fontLink.rel = "stylesheet";
 document.title = "Sign Up";
    const iconLink = document.createElement("link");
    iconLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
    iconLink.rel = "stylesheet";

    document.head.appendChild(fontLink);
    document.head.appendChild(iconLink);

    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(iconLink);
    };
  }, []);

  return (
    <div className="font-display">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(164,195,178,0.1), rgba(164,195,178,0.2)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6PUrpjkjyincuTDz70Kp3uWOsBqaV5bUjNmNOLROyc4VzXB_XB5GBH4UM8WusZA4Pnv5i2arx4qoeU59zGG2x-P7VgploI6JLXGBqehMSHHOGeib6F1SFrnrmCLzQIvjQHCjC-jDAEY71ELh9ptJ6FUyYFdAyxR6scdHVj3rW0OdFxLWIpAJPBn8nLYJQ4uts1Af8U7B2QMmgW32fiu8VJCFP60bSTxAemJShzuv6Bvgw9_ZxFntoroznlUdnTyDYcF0cY0EoJuU")'
          }}
        ></div>

        <div className="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl relative z-10">

          {/* LEFT IMAGE PANEL */}
          <div className="hidden md:flex lg:w-fit bg-cover bg-center">
            <img
              alt="UI IMG"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWh0USG39tFvwokAIz_pdars8ddljwwcAaL2Rb2dNPzK0xGO77IynusRTLuX7jY14_-JVyTw_t-YRMHk7RJFKXNdmcvtBl4-AMzsqNvSKLcm__Jqsz06weZoK7zgx6UYEUwUftPEfu7Nbducooo8FnAzaW9ChYCobsGDzWVuObUqUuNse8ydY8joCtGP-mJbkBbsXL0aRhIH5ymTNeop3K--0qPIi4D53vvgSVqNey-tLSVi3ziu2ZHcjaTnGiuFptyaMmtT_egA"
              className="mx-auto"
            />
          </div>

          {/* RIGHT PANEL: FORM */}
          <div className="w-full md:w-1/2 p-10 bg-[#f6fff8] flex flex-col justify-center">
            <h1 className="text-4xl font-black mb-2">Create Account</h1>
            <p className="text-gray-600 mb-8">Join us and start your journey.</p>

            <form className="flex flex-col gap-6"  onSubmit={handleSubmit}
              >

              {/* Full Name */}
              <label className="flex flex-col w-full ">
                <p className="pb-2 font-medium ">Username</p>
                <input
                  name="fullname"
                  value={Fullname}
                  className="form-input rounded-lg border p-4 h-12 bg-white w-full shadow-lg/20 hover:scale-102  transition-transform ease-in"
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e)=>
                    setFullname(e.target.value)
                  }
                  
                />
              </label>

              {/* Email */}
              <label className="flex flex-col w-full">
                <p className="pb-2 font-medium">Email</p>
                <input
                  name="email"
                   value={email}
                  className="form-input rounded-lg border p-4 h-12 bg-white w-full shadow-lg/20 hover:scale-102  transition-transform ease-in"
                  type="email"
                  placeholder="Enter your email"
                   onChange={(e)=>{setEmail(e.target.value)

                   }}
                />
              </label>

              {/* Password */}
              <label className="flex flex-col w-full">
                <p className="pb-2 font-medium">Password</p>

                <div className="relative">
                  <input
                    name="password"
                      value={password}
                    className="form-input rounded-lg border p-4 pr-12 h-12 bg-white w-full shadow-lg/20 hover:scale-102  transition-transform ease-in"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password"
                     onChange={(e)=>setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-4"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    <span className="material-symbols-outlined">
                      {passwordVisible ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </label>

              {/* Submit Button */}
              <button
  type="submit"
  className="px-7 h-12 text-xl rounded-full bg-green-800 text-white hover:bg-green-900 hover:scale-105 transition-all duration-200 ease-in-out shadow-md"
>
  Sign Up
</button>

            </form>

            {/* Already Have Account */}
            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-700 font-bold underline cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
