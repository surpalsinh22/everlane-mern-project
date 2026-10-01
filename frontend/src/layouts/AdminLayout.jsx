import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside
        className="
          w-full md:w-64 lg:w-72
          bg-white
          border-b md:border-b-0 md:border-r border-gray-200
          md:sticky md:top-0 md:h-screen md:self-start
        "
      >

        {/* Logo / Title */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold tracking-wide text-gray-900">
            EVERLANE
          </h1>

          <p className="text-xs text-gray-500 mt-1 tracking-wider">
            ADMIN PANEL
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 md:p-5">

          <div className="space-y-2">

            <Link
              to="/admin/dashboard"
              className={`block px-4 py-3 rounded-md text-sm font-medium transition ${
                isActive("/admin/dashboard")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              className={`block px-4 py-3 rounded-md text-sm font-medium transition ${
                isActive("/admin/products")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Products
            </Link>

            <Link
              to="/admin/add-product"
              className={`block px-4 py-3 rounded-md text-sm font-medium transition ${
                isActive("/admin/add-product")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Add Product
            </Link>

            <Link
              to="/admin/orders"
              className={`block px-4 py-3 rounded-md text-sm font-medium transition ${
                isActive("/admin/orders")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Orders
            </Link>

            <Link
              to="/admin/users"
              className={`block px-4 py-3 rounded-md text-sm font-medium transition ${
                isActive("/admin/users")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Users
            </Link>

          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* View Website */}
          <Link
            to="/men"
            className="block px-4 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            View Website
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10">
        <Outlet />
      </main>

    </div>
  );
}

