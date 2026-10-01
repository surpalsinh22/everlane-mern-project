import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";

import ProductDetails from "./pages/ProductDetails";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Cart from "./pages/Cart";

import EverworldStories from "./pages/EverworldStories";
import Clothing from "./pages/Clothing";
import PantsAndDenim from "./pages/PantsAndDenim";
import TopsAndSweaters from "./pages/PantsAndDenim";

import Users from "./pages/Users";
import AdminOrders from "./pages/AdminOrders";

// Collection Pages
import NewArrivals from "./pages/NewArrivals";
import BestSellers from "./pages/BestSellers";
import HolidayGifting from "./pages/HolidayGifting";


// ============================================
// SCROLL TO TOP
// ============================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


// ============================================
// APP
// ============================================

export default function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Scroll page to top whenever route changes */}
      <ScrollToTop />


      {/* Normal Website Navbar */}
      {!isAdminPage && <Navbar />}


      <main className="flex-1">

        <Routes>

          {/* =========================================
              PUBLIC WEBSITE
          ========================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/everworld-stories"
            element={<EverworldStories />}
          />


          {/* =========================================
              COLLECTION PAGES
          ========================================= */}

          <Route
            path="/new-arrivals"
            element={<NewArrivals />}
          />

          <Route
            path="/best-sellers"
            element={<BestSellers />}
          />

          <Route
            path="/holiday-gifting"
            element={<HolidayGifting />}
          />


          {/* =========================================
              WOMEN
          ========================================= */}

          <Route
            path="/women"
            element={<Women />}
          />

          <Route
            path="/women/:subCategory"
            element={<Women />}
          />


          {/* =========================================
              MEN
          ========================================= */}

          <Route
            path="/men"
            element={<Men />}
          />

          <Route
            path="/men/:subCategory"
            element={<Men />}
          />


          {/* =========================================
              OTHER CATEGORIES
          ========================================= */}

          <Route
            path="/clothing"
            element={<Clothing />}
          />

          <Route
            path="/pants-denim"
            element={<PantsAndDenim />}
          />

          <Route
            path="/tops-sweaters"
            element={<TopsAndSweaters />}
          />


          {/* =========================================
              PRODUCT DETAILS
          ========================================= */}

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />


          {/* =========================================
              CART
          ========================================= */}

          <Route
            path="/cart"
            element={<Cart />}
          />


          {/* =========================================
              ADMIN PANEL
          ========================================= */}

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="add-product"
              element={<AddProduct />}
            />

            <Route
              path="products"
              element={<ManageProducts />}
            />

            <Route
              path="products/edit/:id"
              element={<AddProduct />}
            />

            <Route
              path="orders"
              element={<AdminOrders />}
            />

            <Route
              path="users"
              element={<Users />}
            />

          </Route>

        </Routes>

      </main>


      {/* Normal Website Footer */}
      {!isAdminPage && <Footer />}

    </div>
  );
}