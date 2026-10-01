import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { getProducts } from "../api/productApi";

const collectionInfo = {
  "new-arrivals": {
    label: "Just In",
    title: "New Arrivals",
    description:
      "Fresh styles and everyday essentials designed for the season ahead.",
  },

  "best-sellers": {
    label: "Customer Favorites",
    title: "Best Sellers",
    description:
      "The pieces our customers keep coming back to, season after season.",
  },

  "holiday-gifting": {
    label: "Gift Guide",
    title: "Holiday Gifting",
    description:
      "Thoughtful essentials made for everyone on your holiday list.",
  },
};

export default function Collection() {
  const { type } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const collection =
    collectionInfo[type] || collectionInfo["new-arrivals"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts();

        if (res.success) {
          setProducts(res.data || []);
        }
      } catch (error) {
        console.error("Collection products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="bg-[#f5f5f2] px-5 md:px-10 py-20 md:py-28">

        <div className="max-w-4xl mx-auto text-center">

          <div className="flex justify-center mb-5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Sparkles
                className="w-4 h-4 text-neutral-700"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-neutral-500">
            {collection.label}
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-serif font-normal tracking-tight text-neutral-900">
            {collection.title}
          </h1>

          <p className="max-w-xl mx-auto mt-6 text-sm md:text-base leading-7 text-neutral-600">
            {collection.description}
          </p>

          <div className="flex justify-center gap-3 mt-8">

            <Link
              to="/women"
              className="bg-neutral-900 text-white px-6 md:px-8 py-3.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] hover:bg-neutral-700 transition"
            >
              Shop Women
            </Link>

            <Link
              to="/men"
              className="bg-white border border-neutral-300 text-neutral-900 px-6 md:px-8 py-3.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] hover:bg-neutral-50 transition"
            >
              Shop Men
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================
          PRODUCT SECTION
      ========================================= */}

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">

        <div className="flex items-end justify-between border-b border-neutral-200 pb-5 mb-8">

          <div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
              Everlane Collection
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {collection.title}
            </h2>

          </div>

          {!loading && (
            <p className="hidden md:block text-xs text-neutral-400">
              {products.length} products
            </p>
          )}

        </div>


        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item}>

                <div className="aspect-[3/4] bg-neutral-100 animate-pulse" />

                <div className="mt-4 h-3 w-20 bg-neutral-100 animate-pulse" />

                <div className="mt-2 h-4 w-32 bg-neutral-100 animate-pulse" />

                <div className="mt-2 h-3 w-16 bg-neutral-100 animate-pulse" />

              </div>
            ))}

          </div>
        )}


        {/* =========================================
            EMPTY
        ========================================= */}

        {!loading && products.length === 0 && (
          <div className="py-20 text-center">

            <p className="text-lg font-medium text-neutral-800">
              No products available
            </p>

            <p className="text-sm text-neutral-500 mt-2">
              Please check back soon for new styles.
            </p>

          </div>
        )}


        {/* =========================================
            PRODUCTS
        ========================================= */}

        {!loading && products.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">

            {products.map((product) => {

              const price =
                Number(product.discountprice) ||
                Number(product.price);

              return (

                <div
                  key={product._id}
                  className="group"
                >

                  {/* IMAGE */}

                  <Link
                    to={`/product/${product._id}`}
                    className="block"
                  >

                    <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">

                      {product.images?.[0] ? (

                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                      ) : (

                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                          No Image
                        </div>

                      )}


                      {/* NEW BADGE */}

                      <div className="absolute top-3 left-3">

                        <span className="bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] font-semibold">
                          {type === "new-arrivals"
                            ? "New"
                            : type === "best-sellers"
                            ? "Popular"
                            : "Gift"}
                        </span>

                      </div>


                      {/* HEART */}

                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Heart
                          className="w-4 h-4"
                          strokeWidth={1.5}
                        />
                      </button>


                      {/* QUICK VIEW */}

                      <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">

                        <div className="bg-white text-neutral-900 py-3 text-center text-[10px] uppercase tracking-[0.18em] font-semibold shadow-sm">
                          View Product
                        </div>

                      </div>

                    </div>

                  </Link>


                  {/* PRODUCT INFO */}

                  <div className="pt-4">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      {product.category || "Collection"}
                    </p>

                    <Link to={`/product/${product._id}`}>

                      <h3 className="text-sm font-medium text-neutral-900 leading-5 hover:underline underline-offset-4">
                        {product.title}
                      </h3>

                    </Link>


                    {/* PRICE */}

                    <div className="flex items-center gap-2 mt-2">

                      <p className="text-sm font-semibold text-neutral-900">
                        ₹{price.toLocaleString("en-IN")}
                      </p>

                      {product.discountprice &&
                        Number(product.discountprice) <
                          Number(product.price) && (

                          <p className="text-xs text-neutral-400 line-through">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                          </p>

                        )}

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </section>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="border-t border-neutral-200">

        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="text-center md:text-left">

            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-3">
              Everlane Essentials
            </p>

            <h2 className="text-2xl md:text-3xl font-serif text-neutral-900">
              Quality you can wear every day.
            </h2>

          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-neutral-900 pb-1 hover:gap-4 transition-all"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </section>

    </div>
  );
}