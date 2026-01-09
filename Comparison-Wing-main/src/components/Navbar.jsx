import { useNavigate } from "react-router-dom";
import { COLORS } from '../constants/colorConstants'

const NavBar = ({
    isLoggedIn = false,
}) => {
  const navigate = useNavigate();
 
 return (
  <header className="flex items-center justify-between whitespace-nowrap py-6 ">
      <div className="flex items-center gap-2 text-gray-900 font-extrabold text-[56px] ">
        <span className="text-6xl  hover:scale-110 transition-transform ease-in cursor-pointer text-[#22333b]">Compare Wings</span>
        
      </div>
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-5xl  ">
        {['Destinations', 'Deals', 'Features'].map(item => (
          <a key={item} className={`text-gray-600 hover:text-gray-900 text-sm font-medium transition duration-200`} href="#">
            {item}
          </a>
        ))}
      </div>
      
      {
        !isLoggedIn ? (
            <div className="flex gap-2" >
                <button onClick={()=>navigate("/login")} className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-transparent text-gray-900 border border-gray-400  text-sm font-bold transition duration-200  shadow-xl/20 hover:scale-103`}    style={{ backgroundColor: COLORS.primary }}  >
                <span  className="truncate">Log In</span>
                </button> 
                <button className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 hover: text-gray-900 text-sm font-bold shadow-xl/20 hover:scale-103 `} onClick={()=>navigate("/Signup")} style={{ backgroundColor: COLORS.primary }}>
                <span className="truncate">Sign Up</span>
                </button>
            </div>
        ) : (
            
           <div className="flex gap-2" >
                <button  className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-transparent text-gray-900 border border-gray-400  text-sm font-bold transition duration-200  shadow-xl/20 hover:scale-103`}    style={{ backgroundColor: COLORS.primary }}  >
                <span  className="truncate">Contact US</span>
                </button>
            </div> 
        )
      }
  </header>
  )
};

export default NavBar;