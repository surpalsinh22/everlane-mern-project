import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginApi(formData);
      if (res.success) {
        console.log("LOGIN RESPONSE:", res);
console.log("TOKEN:", res.accessToken);

        loginUser(res.user, res.accessToken);
       if (res.user.role === 'admin')
         { 
          navigate('/admin/dashboard'); 
        }else
        {
           navigate('/'); 
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 border border-gray-200 bg-white shadow-sm space-y-6">
        <h2 className="text-2xl font-sans tracking-tight text-center uppercase font-normal">Log In</h2>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 cursor-pointer transition-colors"
          >
            {loading ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="underline text-black font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}