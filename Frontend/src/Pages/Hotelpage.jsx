import React, { useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api";

export default function HotelPage() {

  const [form, setForm] = useState({
    city: "",
    from: "",
    to: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 CART STATES
  const [showModal, setShowModal] = useState(false);
  const [carts, setCarts] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // ---------------- HANDLE INPUT ----------------
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

      const res = await api.post("/Hotels/search", {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">

      <div className="max-w-5xl mx-auto px-4">
        <NavBar isLoggedIn={true} />

        {/* 🔍 SEARCH */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 mt-6 rounded-2xl shadow-xl border border-blue-100"
        >
          <h2 className="text-xl font-bold mb-4 text-blue-900">
            Search Hotels 🏨
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="p-3 rounded-xl border border-blue-200"
            />

            <input
              type="date"
              name="from"
              value={form.from}
              onChange={handleChange}
              className="p-3 rounded-xl border border-blue-200"
            />

            <input
              type="date"
              name="to"
              value={form.to}
              onChange={handleChange}
              className="p-3 rounded-xl border border-blue-200"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-red-500 text-white rounded-xl font-bold hover:scale-105 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* ⏳ LOADING */}
        {loading && (
          <p className="text-center mt-4 text-blue-700">
            Fetching hotels...
          </p>
        )}

        {/* 🏨 RESULTS */}
        {!loading && results.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl border border-blue-100">

            <h2 className="text-xl font-bold mb-4 text-blue-900 text-center">
              Available Hotels
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {results.map((hotel, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border bg-gradient-to-r from-white to-blue-50 shadow hover:shadow-lg hover:scale-[1.02] transition"
                >
                  <h3 className="font-bold text-lg text-blue-900">
                    {hotel.hotelname}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Premium Stay
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <p className="text-xl font-bold text-red-500">
                      ₹{hotel.price}
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

          <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl border">

            <h2 className="font-bold mb-4 text-lg text-blue-900">
              Select Cart
            </h2>

            {carts.map((cart) => (
              <div
                key={cart.id}
                onClick={() => addToCart(cart.id)}
                className="p-3 border mb-2 rounded-lg cursor-pointer hover:bg-blue-50"
              >
                {cart.name}
              </div>
            ))}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-red-500 text-sm hover:underline"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}