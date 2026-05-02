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

    if (USE_DUMMY) {
      setCarts([
        { id: 1, name: "Goa Trip 🏖️" },
        { id: 2, name: "Manali Plan 🏔️" }
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

  useEffect(() => {
    fetchCarts();
  }, []);

  // ---------------- CREATE CART ----------------
  const handleCreateCart = async () => {

    if (!cartName.trim()) {
      alert("Enter cart name");
      return;
    }

    if (USE_DUMMY) {
      setCarts([...carts, { id: Date.now(), name: cartName }]);
      setCartName("");
      setShowModal(false);
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
    <div className="min-h-screen bg-[#e2ece9]">

      <div className="max-w-4xl mx-auto px-4">
        <NavBar isLoggedIn={true} />

        <div className="bg-white p-6 rounded-xl shadow mt-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Carts</h2>

            {/* ➕ OPEN MODAL */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              + Create Cart
            </button>
          </div>

          {/* 📦 CART LIST */}
          {carts.length === 0 ? (
            <p className="text-gray-500">No carts found</p>
          ) : (
            carts.map((cart) => (
              <div
                key={cart.id}
                className="p-4 border rounded mb-3 flex justify-between items-center hover:bg-gray-50"
              >
                <span>{cart.name}</span>

                <button className="text-sm bg-slate-900 text-white px-3 py-1 rounded">
                  View
                </button>
              </div>
            ))
          )}

        </div>
      </div>

      {/* 🔥 CREATE CART MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">

            <h2 className="text-lg font-bold mb-4">Create New Cart</h2>

            <input
              type="text"
              placeholder="Enter cart name..."
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-2">

              {/* CANCEL */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setCartName("");
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              {/* CREATE */}
              <button
                onClick={handleCreateCart}
                className="px-4 py-2 bg-black text-white rounded"
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