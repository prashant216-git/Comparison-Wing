import React, { useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function HotelPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    city: "",
    from: "",
    to: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [carts, setCarts] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- FORMAT DATE ----------------
  const getMonthDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleString("default", { month: "long" }),
      day: date.getDate().toString()
    };
  };

  // ---------------- SEARCH ----------------
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!form.city || !form.from || !form.to) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const from = getMonthDate(form.from);
      const to = getMonthDate(form.to);

      const res = await api.post("/Hotel/search", {
        city: form.city,
        frommonth: from.month,
        fromdate: from.day,
        tomonth: to.month,
        todate: to.day
      });

      setResults(res.data);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // ---------------- FETCH CARTS ----------------
  const fetchCarts = async () => {
    try {
      const res = await api.get("/cart/all");
      setCarts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- ADD CLICK ----------------
  const handleAddClick = async (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
    await fetchCarts();
  };

  // ---------------- ADD TO CART ----------------
  const addToCart = async (cartId) => {
    try {
      await api.post("/cart/add", {
        cartid: cartId,
        itemname: selectedHotel.hotelname,
        itemtype: "hotel",
        price: parseInt(selectedHotel.price.toString().replace(/[₹,]/g, ""))
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

        {/* 🔥 SWITCH TABS */}
        <div className="flex gap-4 mb-6 justify-center mt-4">

          <button
            onClick={() => navigate("/homepage")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              location.pathname === "/homepage"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-600 border hover:bg-blue-50"
            }`}
          >
            ✈ Flights
          </button>

          <button
            onClick={() => navigate("/hotels")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              location.pathname === "/hotels"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-slate-600 border hover:bg-indigo-50"
            }`}
          >
            🏨 Hotels
          </button>

        </div>

        {/* 🔍 SEARCH */}
        <form
          onSubmit={handleSearch}
          className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white"
        >
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            Search Hotels 🏨
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />

            <input
              type="date"
              name="from"
              value={form.from}
              onChange={handleChange}
              className="h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />

            <input
              type="date"
              name="to"
              value={form.to}
              onChange={handleChange}
              className="h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />

            <button
              type="submit"
              className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.03] transition"
            >
              Search
            </button>

          </div>
        </form>

        {/* ⏳ LOADING */}
        {loading && (
          <p className="text-center mt-4 text-indigo-600">
            Fetching hotels...
          </p>
        )}

        {/* 🏨 RESULTS */}
        {!loading && results.length > 0 && (
          <div className="mt-6 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white">

            <h2 className="text-xl font-bold mb-4 text-slate-800 text-center">
              Available Hotels
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {results.map((hotel, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border bg-white shadow hover:shadow-xl hover:scale-[1.02] transition"
                >
                  <h3 className="font-bold text-lg text-slate-800">
                    {hotel.hotelname}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Premium Stay
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <p className="text-xl font-bold text-indigo-600">
                      {hotel.price}
                    </p>

                    <button
                      onClick={() => handleAddClick(hotel)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-700"
                    >
                      Add
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* 🔥 CART MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl">

            <h2 className="font-bold mb-4 text-lg">
              Select Cart
            </h2>

            {carts.map((cart) => (
              <div
                key={cart.id}
                onClick={() => addToCart(cart.id)}
                className="p-3 border mb-2 rounded-lg cursor-pointer hover:bg-indigo-50"
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
    </div>
  );
}