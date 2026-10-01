import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Yahan newsletter subscription ki logic aayegi baad mein
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-200 text-black py-16 px-4 md:px-12 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 ">
        
        {/* Column 1: Account */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold tracking-wide uppercase">Account</h4>
          <ul className="space-y-3 text-sm text-black font-light">
            <li><Link to="/login" className="hover:text-black transition-colors">Log In</Link></li>
            <li><Link to="/signup" className="hover:text-black transition-colors">Sign Up</Link></li>
            <li><Link to="/gift-cards" className="hover:text-black transition-colors">Redeem a Gift Card</Link></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold tracking-wide uppercase">Company</h4>
          <ul className="space-y-3 text-sm text-black font-light">
            <li><Link to="/about" className="hover:text-black transition-colors">About</Link></li>
            <li><Link to="/environmental-initiatives" className="hover:text-black transition-colors">Environmental Initiatives</Link></li>
            <li><Link to="/factories" className="hover:text-black transition-colors">Factories</Link></li>
            <li><Link to="/dei" className="hover:text-black transition-colors">DEI</Link></li>
            <li><Link to="/careers" className="hover:text-black transition-colors">Careers</Link></li>
            <li><Link to="/international" className="hover:text-black transition-colors">International</Link></li>
            <li><Link to="/accessibility" className="hover:text-black transition-colors">Accessibility</Link></li>
          </ul>
        </div>

        {/* Column 3: Get Help */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold tracking-wide uppercase">Get Help</h4>
          <ul className="space-y-3 text-sm text-black font-light">
            <li><Link to="/help-center" className="hover:text-black transition-colors">Help Center</Link></li>
            <li><Link to="/return-policy" className="hover:text-black transition-colors">Return Policy</Link></li>
            <li><Link to="/shipping-info" className="hover:text-black transition-colors">Shipping Info</Link></li>
            <li><Link to="/bulk-orders" className="hover:text-black transition-colors">Bulk Orders</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold tracking-wide uppercase">Connect</h4>
          <ul className="space-y-3 text-sm text-black font-light">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Twitter</a></li>
            <li><Link to="/affiliates" className="hover:text-black transition-colors">Affiliates</Link></li>
            <li><Link to="/stores" className="hover:text-black transition-colors">Our Stores</Link></li>
          </ul>
        </div>

        {/* Column 5: Newsletter Input & Arrow Button */}
        <div className="flex flex-col space-y-4 md:col-span-1">
          <form onSubmit={handleSubscribe} className="flex w-full border border-gray-300">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-[#1c1c1c] text-white px-5 flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              {/* Arrow Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
}