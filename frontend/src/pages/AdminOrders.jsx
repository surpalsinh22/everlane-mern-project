import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api/orderApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();

        console.log("ADMIN ORDERS RESPONSE:", res);

        if (res.success) {
          setOrders(res.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        console.log("ERROR RESPONSE:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-pulse text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 md:p-12 font-sans text-neutral-900">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono mb-1 block">
              Management
            </span>
            <h1 className="text-3xl font-light tracking-tight text-neutral-900">
              Orders Dashboard
            </h1>
          </div>
          <div className="text-xs uppercase tracking-widest bg-white border border-neutral-200 px-4 py-2 rounded-full font-mono text-neutral-600 shadow-sm">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-16 text-center shadow-sm">
            <h3 className="text-lg font-light text-neutral-800 mb-1">No orders found</h3>
            <p className="text-sm text-neutral-400 font-light">
              Orders placed by customers will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* ORDER HEADER INFO */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-base font-medium text-neutral-900">
                        {order.user?.name || "Guest Customer"}
                      </h2>
                      <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full font-mono">
                        ID: {order._id.slice(-6)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 font-light">
                      {order.user?.email || "No email provided"}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xl font-light tracking-tight text-neutral-900">
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>

                {/* PRODUCTS LIST */}
                <div className="pt-6 space-y-4">
                  <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono block">
                    Ordered Items
                  </span>

                  <div className="divide-y divide-neutral-100">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-16 object-cover rounded-lg border border-neutral-200 flex-shrink-0"
                            />
                          )}
                          <div className="space-y-1">
                            <h3 className="font-medium text-sm text-neutral-900">
                              {item.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-light">
                              <span>Qty: <strong className="font-medium text-neutral-700">{item.quantity}</strong></span>
                              <span>•</span>
                              <span>Size: <strong className="font-medium text-neutral-700">{item.size || "N/A"}</strong></span>
                              {item.color && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1.5">
                                    Color: 
                                    <span 
                                      className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                                      style={{ backgroundColor: item.color.hexcode || '#ccc' }}
                                    />
                                    <strong className="font-medium text-neutral-700">{item.color.name}</strong>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right sm:self-center">
                          <p className="text-sm font-medium text-neutral-900">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-mono">
                            (₹{item.price} each)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}