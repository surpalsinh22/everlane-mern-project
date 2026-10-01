import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProducts } from '../api/productApi';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ===============================
  // SEARCH STATES
  // ===============================

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // CartContext se cart count
  const { cartCount } = useCart();

  const location = useLocation();
  const { user } = useAuth();

  const isHomePage = location.pathname === '/';
  const isWomenPage = location.pathname.startsWith('/women');
  const isMenPage = location.pathname.startsWith('/men');

  // Sirf admin ko dashboard icon dikhega
  const isAdmin = user?.role === 'admin';

  // ==========================================
  // SEARCH
  // ==========================================

  useEffect(() => {
    const searchProducts = async () => {
      // Agar search empty hai
      if (!search.trim()) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }

      try {
        setSearchLoading(true);

        const res = await getProducts({
          search: search.trim()
        });

        if (res.success) {
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
        }

      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    // 400ms debounce
    const timer = setTimeout(() => {
      searchProducts();
    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  // ==========================================
  // CLOSE SEARCH
  // ==========================================

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearch('');
    setSearchResults([]);
  };

  // Top nav link style
  const getTopLinkClass = ({ isActive }) =>
    `pb-1 transition-all duration-200 text-xs tracking-[0.15em] uppercase font-medium ${
      isActive
        ? 'border-b border-neutral-900 text-neutral-900 font-semibold'
        : 'border-b border-transparent hover:border-neutral-400 text-neutral-600 hover:text-neutral-900'
    }`;

  // Sub category link style
  const getSubCatClass = ({ isActive }) =>
    `transition-colors duration-200 text-xs uppercase tracking-[0.15em] font-medium whitespace-nowrap pb-1 ${
      isActive
        ? 'text-neutral-900 font-semibold border-b border-neutral-900'
        : 'text-neutral-500 hover:text-neutral-900'
    }`;

  return (
    <header className="w-full font-sans text-neutral-900 border-b border-neutral-200 sticky top-0 bg-white z-50">

      {/* ==========================================
          TOP ANNOUNCEMENT
      ========================================== */}

      <div className="bg-neutral-900 text-neutral-100 py-2.5 px-4 flex justify-between items-center text-xs">

        <div className="flex-1 text-center font-light tracking-[0.1em]">
          Get early access on launches and offers.{' '}

          <Link
            to="/signup-text"
            className="underline font-normal hover:text-neutral-300 ml-1 tracking-wider"
          >
            Sign Up For Texts &rarr;
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-neutral-400">
          <span>🇺🇸</span>
          <span>USD</span>
        </div>

      </div>


      {/* ==========================================
          MAIN HEADER
      ========================================== */}

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between relative">

        {/* Mobile menu button */}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1 text-neutral-900 focus:outline-none z-10 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[1.5]" />
          ) : (
            <Menu className="w-6 h-6 stroke-[1.5]" />
          )}
        </button>


        {/* ==========================================
            DESKTOP LEFT LINKS
        ========================================== */}

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 z-10">

          <NavLink
            to="/women"
            className={getTopLinkClass}
          >
            Women
          </NavLink>

          <NavLink
            to="/men"
            className={getTopLinkClass}
          >
            Men
          </NavLink>

          <NavLink
            to="/about"
            className={getTopLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/everworld-stories"
            className={getTopLinkClass}
          >
            Everworld Stories
          </NavLink>

        </nav>


        {/* ==========================================
            LOGO
        ========================================== */}

        <div className="static md:absolute md:left-1/2 md:-translate-x-1/2 text-lg sm:text-2xl md:text-[1.75rem] font-medium tracking-[0.3em] uppercase text-neutral-900 font-serif text-center whitespace-nowrap">

          <Link to="/">
            EVERLANE
          </Link>

        </div>


        {/* ==========================================
            RIGHT SIDE ICONS
        ========================================== */}

        <div className="flex items-center space-x-5 md:space-x-6 text-neutral-900 z-10">

          {/* Search */}

          <button
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-neutral-500 cursor-pointer transition-colors"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>


          {/* Account */}

          <Link
            to="/login"
            aria-label="Account"
            className="hover:text-neutral-500 transition-colors"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
          </Link>


          {/* Admin dashboard */}

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              aria-label="Admin Dashboard"
              title="Admin Dashboard"
              className="hover:text-neutral-500 transition-colors"
            >
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </Link>
          )}


          {/* Cart */}

          <Link
            to="/cart"
            aria-label="Cart"
            className="hover:text-neutral-500 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />

            {/* Cart count */}

            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>


      {/* ==========================================
          SEARCH OVERLAY
      ========================================== */}

      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-sm z-50">

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5">

            {/* Search input */}

            <div className="flex items-center gap-4 border-b border-neutral-300 pb-3">

              <Search className="w-5 h-5 stroke-[1.5] text-neutral-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                placeholder="Search products..."
                className="flex-1 outline-none text-sm tracking-wide text-neutral-900 placeholder:text-neutral-400"
              />

              <button
                onClick={closeSearch}
                className="cursor-pointer hover:text-neutral-500 transition-colors"
                aria-label="Close Search"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

            </div>


            {/* ==========================================
                SEARCH CONTENT
            ========================================== */}

            {search.trim() && (
              <div className="mt-5">

                {/* Loading */}

                {searchLoading && (
                  <div className="py-6 text-center">

                    <p className="text-xs text-neutral-500 tracking-wide">
                      Searching...
                    </p>

                  </div>
                )}


                {/* Results */}

                {!searchLoading && searchResults.length > 0 && (
                  <div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
                      Search Results
                    </p>


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-h-[60vh] overflow-y-auto">

                      {searchResults.map((product) => (

                        <Link
                          key={product._id}
                          to={`/product/${product._id}`}
                          onClick={closeSearch}
                          className="group"
                        >

                          {/* Product Image */}

                          <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">

                            {product.images?.[0] ? (

                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />

                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                                No Image
                              </div>

                            )}

                          </div>


                          {/* Product Info */}

                          <div>

                            <h3 className="text-xs uppercase tracking-[0.1em] text-neutral-800 line-clamp-1">
                              {product.title}
                            </h3>

                            <p className="text-xs text-neutral-500 mt-1">

                              {product.discountprice
                                ? `₹${product.discountprice}`
                                : `₹${product.price}`}

                            </p>

                          </div>

                        </Link>

                      ))}

                    </div>

                  </div>
                )}


                {/* No Results */}

                {!searchLoading && searchResults.length === 0 && (
                  <div className="py-8 text-center">

                    <p className="text-sm text-neutral-700">
                      No products found
                    </p>

                    <p className="text-xs text-neutral-400 mt-2">
                      Try searching for shirts, tees, pants or sweaters.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}


      {/* ==========================================
          HOME CATEGORY BAR
      ========================================== */}

      {isHomePage && (
        <div className="hidden md:block border-t border-neutral-100 py-3 bg-white">

          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center space-x-8 lg:space-x-10 overflow-x-auto whitespace-nowrap">

          <NavLink
  to="/holiday-gifting"
  className={getSubCatClass}
>
  Holiday Gifting
</NavLink>

<NavLink
  to="/new-arrivals"
  className={getSubCatClass}
>
  New Arrivals
</NavLink>

<NavLink
  to="/best-sellers"
  className={getSubCatClass}
>
  Best-Sellers
</NavLink>

            <NavLink
              to="/clothing"
              className={getSubCatClass}
            >
              Clothing
            </NavLink>

            <NavLink
              to="/tops-sweaters"
              className={getSubCatClass}
            >
              Tops & Sweaters
            </NavLink>

            <NavLink
              to="/pants-denim"
              className={getSubCatClass}
            >
              Pants & Denim
            </NavLink>

            <NavLink
              to="/category/outerwear"
              className={getSubCatClass}
            >
              Outerwear
            </NavLink>

            <NavLink
              to="/category/shoes-bags"
              className={getSubCatClass}
            >
              Shoes & Bags
            </NavLink>

            <NavLink
              to="/sale"
              className={`${getSubCatClass} text-neutral-400 hover:text-neutral-900`}
            >
              Sale
            </NavLink>

          </div>

        </div>
      )}


      {/* ==========================================
          WOMEN CATEGORY BAR
      ========================================== */}

      {isWomenPage && (
        <div className="hidden md:block border-t border-neutral-100 py-3 bg-white">

          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center space-x-10 overflow-x-auto whitespace-nowrap">

            <NavLink
              to="/women"
              className={getSubCatClass}
            >
              New
            </NavLink>

            <NavLink
              to="/women/tees"
              className={getSubCatClass}
            >
              Tees
            </NavLink>

            <NavLink
              to="/women/denim"
              className={getSubCatClass}
            >
              Denim
            </NavLink>

            <NavLink
              to="/women/sweaters"
              className={getSubCatClass}
            >
              Sweaters
            </NavLink>

            <NavLink
              to="/women/shoes"
              className={getSubCatClass}
            >
              Shoes
            </NavLink>

          </div>

        </div>
      )}


      {/* ==========================================
          MEN CATEGORY BAR
      ========================================== */}

      {isMenPage && (
        <div className="hidden md:block border-t border-neutral-100 py-3 bg-white">

          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center space-x-10 overflow-x-auto whitespace-nowrap">

            <NavLink
              to="/men"
              className={getSubCatClass}
            >
              New
            </NavLink>

            <NavLink
              to="/men/tees"
              className={getSubCatClass}
            >
              Tees
            </NavLink>

            <NavLink
              to="/men/shirts"
              className={getSubCatClass}
            >
              Shirts
            </NavLink>

            <NavLink
              to="/men/pants"
              className={getSubCatClass}
            >
              Pants
            </NavLink>

          </div>

        </div>
      )}


      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-6 max-h-[85vh] overflow-y-auto">

          {/* Main navigation */}

          <div className="flex flex-col space-y-4 pb-6 border-b border-neutral-100 text-sm font-light">

            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono mb-1">
              Menu
            </p>

            <NavLink
              to="/women"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 uppercase tracking-wider text-xs"
            >
              Women
            </NavLink>

            <NavLink
              to="/men"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 uppercase tracking-wider text-xs"
            >
              Men
            </NavLink>

            <NavLink
              to="/children"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 uppercase tracking-wider text-xs"
            >
              Children
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 uppercase tracking-wider text-xs"
            >
              About
            </NavLink>

            <NavLink
              to="/stories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 uppercase tracking-wider text-xs"
            >
              Everworld Stories
            </NavLink>


            {/* Mobile admin */}

            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 font-medium text-xs uppercase tracking-wider text-neutral-900 pt-2"
              >
                <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                Admin Dashboard
              </NavLink>
            )}

          </div>


          {/* Home mobile categories */}

          {isHomePage && (
            <div className="flex flex-col space-y-3 text-xs text-neutral-600">

              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono mb-1">
                Shop Collection
              </p>

              <NavLink
  to="/holiday-gifting"
  onClick={() => setIsMobileMenuOpen(false)}
>
  Holiday Gifting
</NavLink>

<NavLink
  to="/new-arrivals"
  onClick={() => setIsMobileMenuOpen(false)}
>
  New Arrivals
</NavLink>

<NavLink
  to="/best-sellers"
  onClick={() => setIsMobileMenuOpen(false)}
>
  Best-Sellers
</NavLink>
              <NavLink
                to="/category/clothing"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Clothing
              </NavLink>

              <NavLink
                to="/category/tops-sweaters"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tops & Sweaters
              </NavLink>

              <NavLink
                to="/category/pants-jeans"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pants & Jeans
              </NavLink>

              <NavLink
                to="/category/outerwear"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Outerwear
              </NavLink>

              <NavLink
                to="/category/shoes-bags"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shoes & Bags
              </NavLink>

              <NavLink
                to="/sale"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-neutral-400"
              >
                Sale
              </NavLink>

            </div>
          )}


          {/* Women mobile categories */}

          {isWomenPage && (
            <div className="flex flex-col space-y-3 text-xs text-neutral-600">

              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono mb-1">
                Women Categories
              </p>

              <NavLink
                to="/women"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New
              </NavLink>

              <NavLink
                to="/women/tees"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tees
              </NavLink>

              <NavLink
                to="/women/denim"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Denim
              </NavLink>

              <NavLink
                to="/women/sweaters"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sweaters
              </NavLink>

              <NavLink
                to="/women/shoes"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shoes
              </NavLink>

            </div>
          )}


          {/* Men mobile categories */}

          {isMenPage && (
            <div className="flex flex-col space-y-3 text-xs text-neutral-600">

              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono mb-1">
                Men Categories
              </p>

              <NavLink
                to="/men"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New
              </NavLink>

              <NavLink
                to="/men/tees"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tees
              </NavLink>

              <NavLink
                to="/men/shirts"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shirts
              </NavLink>

              <NavLink
                to="/men/pants"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pants
              </NavLink>

            </div>
          )}

        </div>
      )}

    </header>
  );
}

