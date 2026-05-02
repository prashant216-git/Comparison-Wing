import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api";

const USE_DUMMY = false;

export default function CartPage() {

  const [carts, setCarts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartName, setCartName] = useState("");

  // ---------------- FETCH CARTS ----------------
  const fetchCarts = async () => {
    try {
      const res = await api.get("/cart/all");
      setCarts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  // ---------------- CREATE CART ----------------
  const handleCreateCart = async () => {
    if (!cartName.trim()) {
      alert("Enter cart name");
      return;
    }

    try {
      await api.post("/cart/Create", {
        id: 0,
        name: cartName
      });

      setCartName("");
      setShowModal(false);
      fetchCarts();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">

      <div className="max-w-4xl mx-auto px-4">
        <NavBar isLoggedIn={true} />

        <div className="bg-white p-6 rounded-2xl shadow-xl mt-6 border border-blue-100">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">
              My Carts 🧳
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-red-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all"
            >
              + Create Cart
            </button>
          </div>

          {/* CART LIST */}
          {carts.length === 0 ? (
            <p className="text-gray-400 text-center py-6">
              No carts found
            </p>
          ) : (
            carts.map((cart) => (
              <div
                key={cart.id}
                className="p-4 mb-3 rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 
                flex justify-between items-center shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all"
              >
                <span className="font-semibold text-blue-800">
                  {cart.name}
                </span>

                <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow">
                  View
                </button>
              </div>
            ))
          )}

        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl border border-blue-100 animate-fadeIn">

            <h2 className="text-lg font-bold mb-4 text-blue-900">
              Create New Cart
            </h2>

            <input
              type="text"
              placeholder="Enter cart name..."
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
              className="w-full border border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 p-2 rounded-lg mb-4 outline-none"
            />

            <div className="flex justify-end gap-2">

              {/* CANCEL */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setCartName("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* CREATE */}
              <button
                onClick={handleCreateCart}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-red-500 text-white rounded-lg shadow hover:scale-105 transition-all"
              >
                Create
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}