import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserCount } from '../api/authApi';

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await getUserCount();

        if (res.success) {
          setUserCount(res.count);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Everlane Admin. Here is an overview of your store.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Products Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">

            <div>
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold mb-4">
                📦
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Products
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Add new inventory items, edit pricing, or manage existing catalog details.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">

              <Link
                to="/admin/add-product"
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-lg transition"
              >
                Add Product
              </Link>

              <Link
                to="/admin/products"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 text-sm font-medium rounded-lg transition"
              >
                Manage Products
              </Link>

            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">

            <div>
              <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-center font-bold mb-4">
                🛒
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Orders
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View customer orders, update shipping statuses, and track fulfillment.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">

            <Link
  to="/admin/orders"
  className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-lg transition"
>
  View Orders
</Link>

            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">

            <div>
             <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-center font-bold mb-4">
                👥
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Users
              </h2> 

              <p className="text-sm text-gray-500 mt-1">
                Manage registered customer accounts, roles, and administrative permissions.
              </p>

              {/* User Count From Database */}
              <div className="mt-4">
                <p className="text-3xl font-bold text-gray-900">
                  {userCount}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Registered users
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">

          <Link
  to="/admin/users"
  className="bg-black text-white px-4 py-2 text-sm rounded-lg"
>
  View Users
</Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

