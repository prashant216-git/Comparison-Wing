import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill("")); 
  const navigate = useNavigate(); 
  const inputRefs = useRef([]); 
const location = useLocation();  
const otpresult2= localStorage.getItem("otprcvd");
 console.log("Received OTP JWT:", otpresult2);
  useEffect(() => {
    
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    fontLink.rel = "stylesheet";
     document.title = "Otp Verification";

    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  const handleChange = (element, index) => {
    
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

   
    if (element.nextSibling && element.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
   
    if (e.key === "Backspace" && otp[index] === "" && index !== 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6); 
    const newOtp = pasteData.split('');

    if (newOtp.every(char => !isNaN(parseInt(char)))) { 
      const updatedOtp = [...otp];
      for (let i = 0; i < newOtp.length; i++) {
        updatedOtp[i] = newOtp[i];
      }
      setOtp(updatedOtp);
      
      if (newOtp.length === 6) {
        inputRefs.current[5].focus(); 
      } else if (newOtp.length < 6) {
        inputRefs.current[newOtp.length -1].focus();
      }
    }
  };


  const handleSubmit = async (e) => {
     console.log("handleSubmit called"); 
    e.preventDefault();
    const fullOtp = otp.join("");
    console.log("Submitted OTP:", fullOtp);
 
    const payload={
      otp:fullOtp,
      token:otpresult2
    }
    console.log("Received OTP JWT:", otpresult2);
 try {
    const verifyresponse = await fetch(
      "http://localhost:8080/auth/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!verifyresponse.ok) {
      const errorText = await verifyresponse.text();
      console.error("Verify OTP failed:", errorText);
      alert("OTP verification failed");
      return;
    }

    const data = await verifyresponse.json();
    console.log("OTP verified successfully:", data);
    alert("OTP Verified Successfully ✅");

  } catch (error) {
    console.error("API error:", error);
    alert("Server error");
  }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
        <main className="flex flex-1">
          
          <div
            className="flex flex-1 flex-col justify-center items-center p-4 md:p-8 bg-no-repeat bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6PUrpjkjyincuTDz70Kp3uWOsBqaV5bUjNmNOLROyc4VzXB_XB5GBH4UM8WusZA4Pnv5i2arx4qoeU59zGG2x-P7VgploI6JLXGBqehMSHHOGeib6F1SFrnrmCLzQIvjQHCjC-jDAEY71ELh9ptJ6FUyYFdAyxR6scdHVj3rW0OdFxLWIpAJPBn8nLYJQ4uts1Af8U7B2QMmgW32fiu8VJCFP60bSTxAemJShzuv6Bvgw9_ZxFntoroznlUdnTyDYcF0cY0EoJuU")',
            }}
          >
            <div className="w-full max-w-sm mx-auto p-8 sm:p-12 bg-[#F6FFF8] rounded-xl shadow-lg flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                {/* HEADING */}
                <div className="flex flex-col gap-2 mb-8 text-center">
                  <h1 className="text-3xl sm:text-4xl font-black hover:scale-105 transition-transform ease-in  duration-300">
                    Verify Your Account
                  </h1>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    We sent a 6-digit code to your email.
                  </p>
                </div>

                {/* OTP FORM */}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <label className="flex flex-col w-full">
                    <p className="pb-2 font-medium text-center">Enter OTP</p>
                    <div className="flex justify-center gap-2 sm:gap-4">
                      {otp.map((data, index) => {
                        return (
                          <input
                            key={index}
                            className="form-input w-10 h-10 sm:w-10 sm:h-10 text-center text-2xl font-bold rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-background-dark"
                            type="text"
                            name="otp"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste} 
                            ref={(el) => (inputRefs.current[index] = el)}
                          />
                        );
                      })}
                    </div>
                  </label>

                  {/* Resend OTP */}
                  <div className="text-center text-sm">
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                      Didn't receive the code?{" "}
                      <a className="text-secondary font-bold underline cursor-pointer">
                        Resend
                      </a>
                    </p>
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    className=" hover:scale-105  rounded-lg h-19 text-xl sm:text-2xl"
                  >
                    Verify Account
                  </button>
                </form>

                {/* Go back */}
                <p className="mt-8 text-center text-sm">
                  <a
                    className="text-secondary font-bold underline cursor-pointer"
                    onClick={() => navigate(-1)} 
                  >
                    Go Back
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}