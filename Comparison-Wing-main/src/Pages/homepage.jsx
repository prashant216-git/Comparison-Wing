import React, { useState } from "react";
import { Plane, ArrowRight, Calendar, Clock } from "lucide-react";
import myImage from "../asserts/logo.png";
import NavBar from "../components/Navbar";
import ComparisonCards from "../components/ComparisonCards";

export default function Homepage() {
  // ---------------- COLORS ----------------
  const COLORS = {
    secondary: "#5F7D88",
  };

  // ---------------- TOGGLE BUTTON ----------------
  const Togglebutton = ({ activeTab, onDateClick, onDayClick }) => (
    <div className="flex justify-left items-start py-4 ml-3">
      <div className="bg-white rounded-xl m-1 flex items-center gap-4 pl-1 p-3 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mr-2 hidden sm:block">
          Search Cheapest Flight By:
        </h2>

        {/* BY DATE */}
        <button
          onClick={onDateClick}
          className={`w-20 px-5 py-2 rounded-lg text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
            activeTab === "date" ? "shadow-xl scale-105" : ""
          }`}
          style={{ backgroundColor: COLORS.secondary }}
        >
          Date
        </button>

        {/* BY DAY */}
        <button
          onClick={onDayClick}
          className={`w-20 px-5 py-2 rounded-lg text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
            activeTab === "day" ? "shadow-xl scale-105" : ""
          }`}
          style={{ backgroundColor: COLORS.secondary }}
        >
          Day
        </button>
      </div>
    </div>
  );

  // ---------------- SEARCH INPUT ----------------
  const InputBox = ({ label, type = "text" }) => (
    <div className="flex flex-col rounded-2xl ">
      <label className="text-xs font-semibold text-gray-500  ">{label}</label>
      <input
        className="rounded-xl h-8 px-9 text-sm border-2   hover:scale-102"
        type={type}
      />
    </div>
  );

  const SearchButton = () => (
    <button className="rounded-lg h-8    bg-black text-white font-bold mt-4  hover:scale-[1.02] hover:shadow-xl cursor-pointer">
      Search
    </button>
  );

  // ---------------- SEARCH BAR 1 ----------------
  const PersistentSearchBar = () => (
    <div className="mb-6 p-4 rounded-xl shadow-soft bg-white shadow-lg ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <InputBox label="From" />
        <InputBox label="To" />
        <InputBox label="Date" type="date" />
        <SearchButton />
      </div>
    </div>
  );

  // ---------------- SEARCH BAR 2 ----------------
  const PersistentSearchBar2 = () => (
    <div className="mb-6 p-4 rounded-xl shadow-soft bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <InputBox label="From" />
        <InputBox label="To" />
        <InputBox label="Day" />
        <SearchButton />
      </div>
    </div>
  );

  // Dummy data
  const platform1Data = [
    {
      id: 101,
      airline: "Indigo",
      flightNumber: "6E-204",
      source: "DEL",
      destination: "BOM",
      departureTime: "10:00 AM",
      arrivalTime: "12:15 PM",
      duration: "2h 15m",
      price: "₹4,500",
      stops: "Non-stop",
      classType: "Economy",
      date: "12 Oct",
    },
  ];

  const platform2Data = [
    {
      id: 201,
      airline: "Air India",
      flightNumber: "AI-887",
      source: "DEL",
      destination: "BOM",
      departureTime: "10:30 AM",
      arrivalTime: "12:45 PM",
      duration: "2h 15m",
      price: "₹4,200",
      stops: "Non-stop",
      classType: "Economy",
      date: "12 Oct",
    },
    {
      id: 201,
      airline: "Air India",
      flightNumber: "AI-887",
      source: "DEL",
      destination: "BOM",
      departureTime: "10:30 AM",
      arrivalTime: "12:45 PM",
      duration: "2h 15m",
      price: "₹4,200",
      stops: "Non-stop",
      classType: "Economy",
      date: "12 Oct",
    },
  ];

  const platform3Data = [
    {
      id: 301,
      airline: "Vistara",
      flightNumber: "UK-990",
      source: "DEL",
      destination: "BOM",
      departureTime: "11:00 AM",
      arrivalTime: "01:15 PM",
      duration: "2h 15m",
      price: "₹5,100",
      stops: "Non-stop",
      classType: "Premium Eco",
      date: "12 Oct",
    },
  ];

  // state
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="min-h-screen bg-[#e2ece9]">
      <div className="flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-8">
          <NavBar isLoggedIn={true}/>

          <Togglebutton
            activeTab={activeTab}
            onDateClick={() =>
              setActiveTab((p) => (p === "date" ? null : "date"))
            }
            onDayClick={() => setActiveTab((p) => (p === "day" ? null : "day"))}
          />

          <main className="m-2 px-2">
            {activeTab === "date" && <PersistentSearchBar />}
            {activeTab === "day" && <PersistentSearchBar2 />}

            {/* Comparison section */}
            <div className="w-100%  md:p-8 rounded-xl bg-transparent bg-white/60 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl md:text-2xl font-bold text-center">
                Compare Prices
              </h2>
              <p className="text-center text-slate-700 text-sm">
                Best deals from 3 platforms
              </p>

              <div className="grid lg:grid-cols-3 gap-6 mt-8">
                <ComparisonCards title="MakeMyTrip" data={platform1Data} color="red" />
                <ComparisonCards title="Goibibo" data={platform2Data} color="orange" />
                <ComparisonCards title="Skyscanner" data={platform3Data} color="sky" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
