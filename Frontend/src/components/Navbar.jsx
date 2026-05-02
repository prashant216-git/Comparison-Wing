import { useNavigate } from "react-router-dom";

const NavBar = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();

  const navItems = ["Destinations", "Deals", "Features"];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">

      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition"
        >
          Compare Wings
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">

          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              {item}
            </a>
          ))}

        </nav>

        {/* ACTION BUTTONS */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-full hover:bg-slate-50 transition"
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md hover:scale-105 transition"
            >
              Sign Up
            </button>

          </div>
        ) : (
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-700 transition"
          >
            Contact Us
          </button>
        )}

      </div>

    </header>
  );
};

export default NavBar;