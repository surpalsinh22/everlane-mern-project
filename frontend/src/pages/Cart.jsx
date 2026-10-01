import React, { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../api/cartApi";
import { createOrder } from "../api/orderApi";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET CART
  // =========================

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();

      if (res.success) {
        setCart(res.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
  try {
    const res = await createOrder();

    if (res.success) {
      alert("Order placed successfully");

      setCart({
        items: [],
      });
    }

  } catch (error) {
    console.error("Checkout error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to place order"
    );
  }
};

  // =========================
  // INCREASE QUANTITY
  // =========================

  const handleIncrease = async (itemId) => {
    try {
      const res = await increaseQuantity(itemId);
      if (res.success) {
        setCart(res.data);
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const handleDecrease = async (itemId) => {
    try {
      const res = await decreaseQuantity(itemId);
      if (res.success) {
        setCart(res.data);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const handleRemove = async (itemId) => {
    try {
      const res = await removeFromCart(itemId);
      if (res.success) {
        setCart(res.data);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent mb-4"></div>
        <p className="text-sm font-semibold text-gray-600 tracking-wide">Loading your shopping bag...</p>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
        <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-black/10">
          <ShoppingBag
            className="w-9 h-9"
            strokeWidth={1.8}
          />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Your bag is empty
        </h1>
        <p className="text-gray-500 text-sm mt-2 max-w-sm text-center leading-relaxed">
          Looks like you haven't added anything to your wardrobe yet. Discover our latest arrivals.
        </p>
        <Link
          to="/"
          className="mt-8 bg-black hover:bg-gray-800 text-white px-8 py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition shadow-lg shadow-black/10 flex items-center gap-2"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // =========================
  // TOTAL
  // =========================

const total = cart.items.reduce((sum, item) => {
  if (!item.product) {
    return sum;
  }

  const price =
    Number(item.product.discountprice) ||
    Number(item.product.price);

  return sum + price * item.quantity;
}, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-gray-100/40 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Announcement Bar */}
        <div className="bg-black text-white rounded-2xl p-4 flex items-center justify-between shadow-md text-xs font-medium tracking-wide">
          <div className="flex items-center gap-2.5 mx-auto md:mx-0">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Complimentary express shipping applied on all orders</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-400">
            <Truck className="w-4 h-4" />
            <span>Fast Worldwide Delivery</span>
          </div>
        </div>

        {/* Heading & Back Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200/85 pb-6 gap-4">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-3 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Shopping Bag
            </h1>
          </div>
          <p className="text-sm text-gray-500 font-semibold bg-gray-100/80 px-3.5 py-1.5 rounded-full border border-gray-200/50">
            {cart.items.length} {cart.items.length === 1 ? "Item" : "Items"} Selected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* =========================
              CART ITEMS LIST
          ========================= */}

          <div className="lg:col-span-2 space-y-5">
           {cart.items.map((item) => {
  const product = item.product;

  if (!product) {
    return null;
  }

  const price =
    Number(product.discountprice) ||
    Number(product.price);

  if (!product) {
  return null;
}

              return (
                <div
                  key={item._id}
                  className="group bg-white border border-gray-200/80 rounded-3xl p-5 md:p-6 shadow-xs hover:shadow-xl hover:border-black/15 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="w-28 h-36 md:w-36 md:h-48 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-inner">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between w-full h-full">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h2 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                          {product.title}
                        </h2>
                        {/* Mobile Price View */}
                        <p className="text-base font-extrabold text-gray-900 sm:hidden">
                          ₹{(price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Variant Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
                        <span className="bg-gray-50 border border-gray-200/70 px-3 py-1 rounded-xl font-semibold text-gray-700">
                          Size: <span className="text-black font-bold">{item.size}</span>
                        </span>

                        {item.color && (
                          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/70 px-3 py-1 rounded-xl">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
                              style={{
                                backgroundColor: item.color.hexcode,
                              }}
                            />
                            <span className="font-semibold text-gray-700">
                              {item.color.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300/85 rounded-2xl overflow-hidden bg-gray-50/50 shadow-xs">
                        <button
                          onClick={() => handleDecrease(item._id)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition text-gray-800"
                        >
                          <Minus className="w-3.5 h-3.5" strokeWidth={2.2} />
                        </button>

                        <span className="w-10 text-center text-sm font-bold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrease(item._id)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition text-gray-800"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
                        </button>
                      </div>

                      {/* Desktop Price */}
                      <p className="text-lg font-black text-gray-900 hidden sm:block tracking-tight">
                        ₹{(price * item.quantity).toLocaleString("en-IN")}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-xs font-bold text-gray-400 hover:text-red-600 flex items-center gap-1.5 transition py-1.5 px-3 rounded-xl hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                        <span>Remove</span>
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================
              ORDER SUMMARY BOX
          ========================= */}

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-xs sticky top-24 space-y-6">
              
              <h2 className="text-xl font-black text-gray-900 tracking-tight pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Calculations */}
              <div className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600 uppercase tracking-wider text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Free
                  </span>
                </div>
              </div>

              {/* Total Final */}
              <div className="border-t border-gray-100 pt-5 flex justify-between items-center text-gray-900">
                <span className="font-bold text-base">Total</span>
                <span className="text-2xl font-black tracking-tight">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout Button */}
              
<button
  onClick={handleCheckout}
  className="w-full bg-black hover:bg-gray-800 text-white py-3.5 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition shadow-sm flex items-center justify-center gap-2 group"
>
  <span>Proceed to Checkout</span>
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>



              {/* Security Trust Badge */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Secure & Encrypted Checkout</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}