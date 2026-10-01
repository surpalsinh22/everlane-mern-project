import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { getProducts } from "../api/productApi";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();

        if (res.success) {
          setProducts(res.data || []);
        }
      } catch (error) {
        console.error("New arrivals error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-[#f5f5f2] px-5 md:px-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">
            Just In
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-serif text-gray-900">
            New Arrivals
          </h1>

          <p className="max-w-xl mx-auto mt-6 text-sm md:text-base leading-7 text-gray-600">
            Discover our latest styles, thoughtfully designed for everyday
            comfort and effortless style.
          </p>

          <div className="flex justify-center gap-3 mt-8">

            <Link
              to="/women"
              className="bg-black text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition"
            >
              Shop Women
            </Link>

            <Link
              to="/men"
              className="bg-white border border-gray-300 text-black px-7 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-50 transition"
            >
              Shop Men
            </Link>

          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16">

        <div className="flex justify-between items-end border-b border-gray-200 pb-5 mb-8">

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">
              Latest Styles
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold">
              Fresh from the collection
            </h2>
          </div>

          {!loading && (
            <span className="hidden md:block text-xs text-gray-400">
              {products.length} products
            </span>
          )}

        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item}>
                <div className="aspect-[3/4] bg-gray-100 animate-pulse" />
                <div className="mt-4 h-3 w-20 bg-gray-100 animate-pulse" />
                <div className="mt-2 h-4 w-32 bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">

            {products.map((product) => {

              const price =
                Number(product.discountprice) ||
                Number(product.price);

              return (
                <div key={product._id} className="group">

                  <Link to={`/product/${product._id}`}>

                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">

                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                      <span className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold">
                        New
                      </span>

                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <Heart className="w-4 h-4" strokeWidth={1.5} />
                      </button>

                    </div>

                  </Link>

                  <div className="pt-4">

                    <p className="text-[9px] uppercase tracking-widest text-gray-400">
                      {product.category || "Collection"}
                    </p>

                    <Link to={`/product/${product._id}`}>
                      <h3 className="mt-1 text-sm font-medium text-gray-900 hover:underline">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-sm font-semibold">
                      ₹{price.toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

      {/* BOTTOM */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              New Season
            </p>

            <h2 className="text-2xl md:text-3xl font-serif mt-2">
              Made for what's next.
            </h2>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:gap-4 transition-all"
          >
            Explore Everything
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>
      </section>

    </div>
  );
}