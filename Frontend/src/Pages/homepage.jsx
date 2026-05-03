import React, { useState } from "react";
import NavBar from "../components/Navbar";
import ComparisonCards from "../components/ComparisonCards";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    month: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [carts, setCarts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ---------------- MONTH FORMAT ----------------
  const getMonthName = (monthValue) => {
    if (!monthValue) return "";
    const [year, month] = monthValue.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  // ---------------- SEARCH ----------------
  const search = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.get("/flights/all", {
        params: {
          source: searchData.from,
          destination: searchData.to,
          month: getMonthName(searchData.month)
        }
      });

      setResults(res.data);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // ---------------- FORMAT RESULTS ----------------
  const formattedResults = results.map((item, index) => ({
    id: index,
    airline: item.flightName,
    source: item.source,
    destination: item.destination,
    departureTime: item.departureTime,
    arrivalTime: item.arrivalTime,
    duration: item.duration,
    price: `₹${item.price}`,
    stops: "Non-stop",
    classType: "Economy",
    date: getMonthName(searchData.month) || "N/A"
  }));

  // ---------------- FETCH CARTS ----------------
  const fetchCarts = async () => {
    setCartLoading(true);

    try {
      const res = await api.get("/cart/all");
      setCarts(res.data);
    } catch (err) {
      console.error(err);
    }

    setCartLoading(false);
  };

  // ---------------- OPEN MODAL ----------------
  const handleAddClick = async (item) => {
    setSelectedItem(item);
    setShowModal(true);
    await fetchCarts();
  };

  // ---------------- ADD TO CART ----------------
  const addToCart = async (cartId) => {

    try {
      await api.post("/cart/add", {
        cartid: cartId,
        itemname: selectedItem.airline,
        itemtype: "flight",
        price: Number(selectedItem.price.replace(/[₹,]/g, ""))
      });

      alert("Added to cart ✅");
      setShowModal(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-6xl mx-auto px-4">
        <NavBar isLoggedIn={true} />

        {/* 🔍 SEARCH */}
        <form
          onSubmit={search}
          className="mb-6 p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              name="from"
              value={searchData.from}
              onChange={handleChange}
              placeholder="From"
              className="h-11 px-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />

            <input
              name="to"
              value={searchData.to}
              onChange={handleChange}
              placeholder="To"
              className="h-11 px-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />

            <input
              type="month"
              name="month"
              value={searchData.month}
              onChange={handleChange}
              className="h-11 px-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />

            <button
              type="submit"
              className="h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-[1.03] transition"
            >
              Search
            </button>

          </div>
        </form>

        {/* ⏳ LOADING */}
        {loading && (
          <p className="text-center text-blue-600">Searching flights...</p>
        )}

        {/* ✈ RESULTS */}
        {!loading && (
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white">

            <h2 className="text-xl font-bold text-center mb-4 text-slate-800">
              {results.length > 0 ? "Flight Results" : "Popular Flights"}
            </h2>

            <ComparisonCards
              title="Available Flights"
              data={results.length > 0 ? formattedResults : []}
              onAdd={handleAddClick}
            />

          </div>
        )}
      </div>

      {/* 🛒 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl">

            <h2 className="font-bold mb-4 text-lg">Select Cart</h2>

            {cartLoading ? (
              <p>Loading carts...</p>
            ) : carts.length === 0 ? (
              <p>No carts found</p>
            ) : (
              carts.map((cart) => (
                <div
                  key={cart.id}
                  onClick={() => addToCart(cart.id)}
                  className="p-3 border mb-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                >
                  {cart.name}
                </div>
              ))
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-red-500 text-sm"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* 🛒 FLOATING BUTTON */}
      <button
        onClick={() => navigate("/cart")}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-110 transition"
      >
        My Cart 🛒
      </button>

    </div>
  );
}