import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/authApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setMessage('');

        const res = await getUsers();

        if (res.success) {
          setUsers(res.data);
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            'Failed to load users'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Users
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View registered customer accounts.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">
            Loading users...
          </p>
        )}

        {/* Error */}
        {message && (
          <p className="text-red-500 mb-6">
            {message}
          </p>
        )}

        {/* No Users */}
        {!loading && users.length === 0 && !message && (
          <p className="text-gray-500">
            No users found.
          </p>
        )}

        {/* Users Table */}
        {!loading && users.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">
                      Name
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-700">
                      Role
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-700">
                      Joined
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : '-'}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}