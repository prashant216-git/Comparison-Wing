import React, { useState, useRef } from "react";
import {
  MapPin,
  Calendar,
  Search,
  Tag,
  Compass,
  NotebookTabs,
  Facebook,
  Twitter,
  X,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img2.png";
import NavBar from "../components/Navbar";

// ---------------- HERO IMAGE ----------------
const HeroImage = () => (
  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
    <img
      src={heroImage}
      alt="travel"
      className="w-full h-full object-cover"
    />
  </div>
);

// ---------------- SEARCH BAR ----------------
const SearchBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Flights");

  const tabs = ["Flights", "Hotels", "Itineraries"];

  const InputField = ({ icon: Icon, placeholder }) => (
    <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 h-12 focus-within:border-blue-400 transition">
      <Icon size={18} className="text-slate-500" />
      <input
        placeholder={placeholder}
        className="w-full ml-3 outline-none text-sm bg-transparent"
      />
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">

      {/* TABS */}
      <div className="flex gap-6 border-b border-slate-200 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* INPUTS */}
      <div className="grid md:grid-cols-3 gap-3">
        <InputField icon={MapPin} placeholder="From" />
        <InputField icon={MapPin} placeholder="To" />
        <InputField icon={Calendar} placeholder="Date" />
      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/signup")}
        className="w-full mt-4 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
      >
        <Search size={18} />
        Search Flights
      </button>
    </div>
  );
};

// ---------------- FEATURE CARD ----------------
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/70 backdrop-blur border border-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">
    <Icon className="text-blue-600 mb-3" size={28} />
    <h3 className="font-semibold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 mt-1">{description}</p>
  </div>
);

// ---------------- TESTIMONIALS ----------------
const Testimonials = () => {
  const data = [
    {
      name: "Alex",
      text: "Best flight comparison UI I’ve used!",
      rating: 5,
    },
    {
      name: "Maria",
      text: "Super smooth booking experience.",
      rating: 5,
    },
    {
      name: "David",
      text: "Found cheaper flights instantly.",
      rating: 4,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data.map((t, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition"
        >
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                size={14}
                className={
                  idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-sm text-slate-600">"{t.text}"</p>
          <p className="text-xs text-slate-400 mt-2">- {t.name}</p>
        </div>
      ))}
    </div>
  );
};

// ---------------- MAIN APP ----------------
const App = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Tag,
      title: "Best Deals",
      description: "Find cheapest curated flights instantly.",
    },
    {
      icon: Compass,
      title: "Smart Search",
      description: "AI-powered travel recommendations.",
    },
    {
      icon: NotebookTabs,
      title: "Trip Planner",
      description: "Organize your entire journey easily.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      <div className="max-w-6xl mx-auto px-4">

        <NavBar />

        {/* HERO */}
        <section className="py-16 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Fly Smarter.
              <span className="block text-blue-600">Travel Better.</span>
            </h1>

            <p className="text-slate-600 mt-4 max-w-md">
              Compare flights, find deals, and book your journey in seconds.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition"
            >
              Explore Deals
            </button>
          </div>

          <HeroImage />

        </section>

        {/* SEARCH */}
        <SearchBar />

        {/* FEATURES */}
        <section className="py-20">
          <h2 className="text-2xl font-bold text-center mb-10">
            Everything you need to travel smarter
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="pb-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            Loved by travelers
          </h2>
          <Testimonials />
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="rounded-3xl p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center shadow-xl">

            <h2 className="text-3xl font-bold">
              Ready for your next journey?
            </h2>

            <p className="text-blue-100 mt-2">
              Start exploring the best flights today.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-2xl hover:scale-105 transition"
            >
              Sign Up Now
            </button>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">

          <p>© 2026 Compare Wings</p>

          <div className="flex gap-4">
            <Facebook size={18} />
            <Twitter size={18} />
            <X size={18} />
          </div>

        </footer>

      </div>
    </div>
  );
};

export default App;