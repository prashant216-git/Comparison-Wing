import React, { useState } from "react";
import NavBar from "../components/Navbar";
import ComparisonCards from "../components/ComparisonCards";
import api from "../api";
import { useNavigate } from "react-router-dom";

// 🔥 TOGGLE
const USE_DUMMY_CARTS = true;

// ---------------- INPUT COMPONENT ----------------
const InputBox = ({ label, name, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="rounded-xl h-8 px-3 text-sm border-2"
    />
  </div>
);

// ---------------- SEARCH BUTTON ----------------
const SearchButton = () => (
  <button
    type="submit"
    className="rounded-lg h-8 bg-black text-white font-bold mt-4"
  >
    Search
  </button>
);

export default function Homepage() {

  // 🔹 SEARCH STATE
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    month: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 CART STATE
  const [showModal, setShowModal] = useState(false);
  const [carts, setCarts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ---------------- DUMMY FLIGHTS ----------------
  const dummyFlights = [
    {
      id: 1,
      airline: "IndiGo",
      source: "DEL",
      destination: "BOM",
      departureTime: "10:00 AM",
      arrivalTime: "12:15 PM",
      duration: "2h 15m",
      price: "₹4,500",
      stops: "Non-stop",
      classType: "Economy",
      date: "October"
    },
    {
      id: 2,
      airline: "Air India",
      source: "DEL",
      destination: "BLR",
      departureTime: "11:30 AM",
      arrivalTime: "02:30 PM",
      duration: "3h",
      price: "₹5,200",
      stops: "Non-stop",
      classType: "Economy",
      date: "October"
    }
  ];

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ---------------- MONTH CONVERTER ----------------
  const getMonthName = (monthValue) => {
    if (!monthValue) return "";
    const [year, month] = monthValue.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  // ---------------- SEARCH API ----------------
  const search = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedMonth = getMonthName(searchData.month);

      const response = await api.get("/flights/all", {
        params: {
          source: searchData.from,
          destination: searchData.to,
          month: formattedMonth
        }
      });

      setResults(response.data);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // ---------------- FORMAT API DATA ----------------
  const formattedResults = results.map((item, index) => ({
    id: index,
    airline: item.flightName,
    source: item.source,
    destination: item.destination,
    departureTime: item.departureTime,
    arrivalTime: item.arrivalTime,
    duration: item.duration,
    price: item.price,
    stops: "Non-stop",
    classType: "Economy",
    date: getMonthName(searchData.month) || "N/A"
  }));

  // 🔥 DISPLAY DATA
  const displayFlights =
    results.length > 0 ? formattedResults : dummyFlights;

  // ---------------- FETCH CARTS ----------------
  const fetchCarts = async () => {

    if (USE_DUMMY_CARTS) {
      setCarts([
        { id: 1, name: "Goa Trip 🏖️" },
        { id: 2, name: "Manali Plan 🏔️" },
        { id: 3, name: "Family Vacation 👨‍👩‍👧" },
        { id: 4, name: "Solo Trip ✈️" }
      ]);
      return;
    }

    try {
      const res = await api.get("/cart/all");
      setCarts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- HANDLE ADD ----------------
  const handleAddClick = async (item) => {
    setSelectedItem(item);
    setShowModal(true);
    await fetchCarts();
  };

  // ---------------- ADD TO CART ----------------
  const addToCart = async (cartId) => {

    if (USE_DUMMY_CARTS) {
      alert(`Added to ${carts.find(c => c.id === cartId)?.name} ✅`);
      setShowModal(false);
      return;
    }

    try {
      await api.post("/cart/add", {
        cartid: cartId,
        itemname: selectedItem.airline,
        itemtype: "flight",
        price: parseInt(selectedItem.price.toString().replace(/[₹,]/g, ""))
      });

      alert("Added to cart ✅");
      setShowModal(false);

    } catch (err) {
      console.error(err);
    }
  };
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#e2ece9]">
      <div className="max-w-6xl mx-auto px-4">
        <NavBar isLoggedIn={true} />

        {/* 🔍 SEARCH */}
        <form onSubmit={search} className="mb-6 p-4 bg-white rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <InputBox
              label="From"
              name="from"
              value={searchData.from}
              onChange={handleChange}
            />

            <InputBox
              label="To"
              name="to"
              value={searchData.to}
              onChange={handleChange}
            />

            <InputBox
              label="Month"
              name="month"
              type="month"
              value={searchData.month}
              onChange={handleChange}
            />

            <SearchButton />
          </div>
        </form>

        {/* ⏳ LOADING */}
        {loading && (
          <p className="text-center text-gray-600">Loading flights...</p>
        )}

        {/* ✈ RESULTS (ALWAYS SHOW) */}
        {!loading && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-center mb-4">
              {results.length > 0 ? "Flight Results" : "Popular Flights"}
            </h2>

            <ComparisonCards
              title="Available Flights"
              data={displayFlights}
              onAdd={handleAddClick}
            />
          </div>
        )}
      </div>

      {/* 🛒 CART MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">

            <h2 className="font-bold mb-4 text-lg">Select Cart</h2>

            {carts.map((cart) => (
              <div
                key={cart.id}
                onClick={() => addToCart(cart.id)}
                className="p-3 border mb-2 rounded cursor-pointer hover:bg-gray-100"
              >
                {cart.name}
              </div>
            ))}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-red-500 text-sm"
            >
              Close
            </button>

          </div>

        </div>
      )}
      {/* 🛒 FLOATING CART BUTTON - ADD HERE */}
<button
  onClick={() => navigate("/cart")}
  className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-all"
>
  My Cart 🛒
</button>
    </div>
  );
}