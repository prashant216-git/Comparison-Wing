import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";

export default function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username:"",
    password:""
  })
  

const handleChange=(event)=>{
 
   
  setvalue(()=>(
    {
      ...value,// it is a rest operatot jo rest properties ko yaha copy kr raha hai
  [event.target.name] : event.target.value //isme ham name utha rhe hai or usme value dal de rhe hain 
    }
    
  ))
  console.log(event.target)

}

const formsubmit = async (e) => {
  e.preventDefault();
  console.log("FORM SUBMITTED");  

  try {
    const response = await api.post("/auth/signin",value)


    Swal.fire({
      title: "Success!",
      text: "OTP sent successfully",
      icon: "success",
    });

    

  } catch (error) {
    console.error(error);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong",
      icon: "error",
    });
  }
};



  useEffect(() => {
    // Google Font
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    fontLink.rel = "stylesheet";
document.title="Login"
    // Material Icons
    const iconLink = document.createElement("link");
    iconLink.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    iconLink.rel = "stylesheet";

    
   

    document.head.appendChild(fontLink);
    document.head.appendChild(iconLink);
   
    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(iconLink);
    };
  }, []);

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
        <main className="flex flex-1">
          <div className="flex flex-1 flex-col justify-center items-center p-4 md:p-8 bg-no-repeat bg-cover bg-center bg-fixed " style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6PUrpjkjyincuTDz70Kp3uWOsBqaV5bUjNmNOLROyc4VzXB_XB5GBH4UM8WusZA4Pnv5i2arx4qoeU59zGG2x-P7VgploI6JLXGBqehMSHHOGeib6F1SFrnrmCLzQIvjQHCjC-jDAEY71ELh9ptJ6FUyYFdAyxR6scdHVj3rW0OdFxLWIpAJPBn8nLYJQ4uts1Af8U7B2QMmgW32fiu8VJCFP60bSTxAemJShzuv6Bvgw9_ZxFntoroznlUdnTyDYcF0cY0EoJuU")'

          }}>
            <div className="w-fit max-w-7xl mx-auto flex flex-row rounded-xl shadow-lg overflow-hidden">

              {/* LEFT IMAGE PANEL */}
              <div
                className="hidden md:flex lg:w-fit bg-cover bg-center"
                
              >
                <img
                  alt="UI IMG"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWh0USG39tFvwokAIz_pdars8ddljwwcAaL2Rb2dNPzK0xGO77IynusRTLuX7jY14_-JVyTw_t-YRMHk7RJFKXNdmcvtBl4-AMzsqNvSKLcm__Jqsz06weZoK7zgx6UYEUwUftPEfu7Nbducooo8FnAzaW9ChYCobsGDzWVuObUqUuNse8ydY8joCtGP-mJbkBbsXL0aRhIH5ymTNeop3K--0qPIi4D53vvgSVqNey-tLSVi3ziu2ZHcjaTnGiuFptyaMmtT_egA"
                  className="mx-auto"
                />
              </div>

              {/* RIGHT PANEL: FORM */}
              <div className="w-full md:w-1/2 p-10 bg-[#f6fff8] flex flex-col justify-center ">
                <div className="w-full max-w-md mx-auto">

                  {/* HEADING */}
                  <div className="flex flex-col gap-2 mb-8">
                    {/* MODIFIED: Added responsive text sizing */}
                    <h1 className="text-4xl sm:text-5xl md:text-4xl font-black">Welcome Back</h1>
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                      Plan your next adventure.
                    </p>
                  </div>
   
                  {/* FORM */}
                  <form className="flex flex-col gap-6" >

                    {/* Email */}
                    <label className="flex flex-col w-full hover:scale-102 transition-transform ease-in ">
                      <p className="pb-2 font-medium">Username</p>
                      <input name="username" onChange={handleChange}    //pass the function for change
                           value={value.username}
                        className="form-input rounded-lg border border-border-light dark:border-border-dark p-4 h-12 bg-white w-full shadow-xl "
                        type="text"
                        placeholder="Enter your username"
                      />
                    </label>

                    {/* Password */}
                    <label className="flex flex-col w-full ">
                      <div className="flex justify-between pb-2">
                        <p className="font-medium">Password</p>
                        <a className="text-secondary text-sm underline" href="#">
                          Forgot password?
                        </a>
                      </div>

                      <div className="relative">
                        <input name='password' onChange={handleChange}
                        value={value.password}
                          className="form-input rounded-lg border border-border-light dark:border-border-dark p-4 pr-12 h-12 bg-white w-full shadow-xl hover:scale-102 ease-in  transition-transform "
                          type={passwordVisible ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-4 text-text-muted-light dark:text-text-muted-dark"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          <span className="material-symbols-outlined">
                            {passwordVisible ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </label>

                    {/* Sign In Button */}

                    <button  onClick={formsubmit}
                      type="button"
                      className="   bg-secondary text-grey-700 px-7 rounded-lg h-10   text-2xl hover:scale-105 transition-transform ease-in duration-300 "
                    >
                      Sign In
                    </button> 
                  </form>

                  {/* Separator */}
                  <div className="flex items-center gap-4 my-8">

                  </div>


                  {/* Sign Up */}
                  <p className="mt-8 text-center text-sm">
                    Don't have an account?{" "}

                    <a className="text-secondary font-bold underline  cursor-pointer " onClick={() => navigate("/Signup")}>
                      Sign Up
                    </a>  

                  </p>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}