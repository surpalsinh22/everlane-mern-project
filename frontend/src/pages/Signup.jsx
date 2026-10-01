import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await registerApi(formData);
      if (res.success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-md p-8 sm:p-10 border border-gray-200 bg-white shadow-sm space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-normal tracking-[0.15em] text-black uppercase">
            Create Account
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Join us for a better shopping experience
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 text-xs py-2.5 px-3 text-center border border-red-200 tracking-wide">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-[11px] uppercase tracking-widest text-gray-600 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] uppercase tracking-widest text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] uppercase tracking-widest text-gray-600 font-medium">
              Password (Min 6 chars)
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              className="w-full px-4 py-3 border border-gray-300 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 text-xs tracking-[0.2em] font-medium uppercase hover:bg-gray-800 disabled:opacity-50 cursor-pointer transition-colors mt-2"
          >
            {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Footer / Login Link */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600 tracking-wide">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-black font-semibold uppercase tracking-wider underline underline-offset-4 hover:text-gray-700 ml-1"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}