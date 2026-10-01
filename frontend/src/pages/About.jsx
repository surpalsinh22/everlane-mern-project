import React from 'react';
import { Link } from 'react-router-dom';

// About Images
import aboutImg from '../assets/about1.png';
import aboutimg2 from '../assets/about2.png';
import aboutimg3 from '../assets/about3.png';
import aboutimg4 from '../assets/about4.png';
import aboutimg5 from '../assets/about5.png';
import stbImg from '../assets/stb.png'; // Pricing / Breakdown image

// Store Images (ss1 to ss9)
import ss1 from '../assets/ss1.png';
import ss2 from '../assets/ss2.png';
import ss3 from '../assets/ss3.png';
import ss4 from '../assets/ss4.png';
import ss5 from '../assets/ss5.png';
import ss6 from '../assets/ss6.png';
import ss7 from '../assets/ss7.png';
import ss8 from '../assets/ss8.png';
import ss9 from '../assets/ss9.png';

export default function About() {
  const storesList = [
    { id: 1, image: ss1, city: 'SEATTLE', name: 'University Village' },
    { id: 2, image: ss2, city: 'SAN FRANCISCO', name: 'Valencia Street, San Francisco' },
    { id: 3, image: ss3, city: 'PALO ALTO', name: 'Stanford' },
    { id: 4, image: ss4, city: 'LOS ANGELES', name: 'Abbot Kinney' },
    { id: 5, image: ss5, city: 'BOSTON', name: 'Seaport' },
    { id: 6, image: ss6, city: 'NEW YORK', name: 'Prince Street, New York' },
    { id: 7, image: ss7, city: 'BROOKLYN', name: 'Williamsburg' },
    { id: 8, image: ss8, city: 'KING OF PRUSSIA', name: 'King of Prussia' },
    { id: 9, image: ss9, city: 'GEORGETOWN', name: 'Georgetown' },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      
      {/* 1. HERO SECTION (about1.png) WITH TEXT OVERLAY */}
      <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-gray-900">
        <img 
          src={aboutImg} 
          alt="We believe we can all make a difference" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-wide max-w-2xl leading-snug">
            We believe we can all make a difference.
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-4 tracking-widest uppercase font-medium">
            Our way: exceptional quality, ethical factories, radical transparency.
          </p>
        </div>
      </div>

      {/* 2. INTRO PARAGRAPH SECTION */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
          At Everlane, we want the right choice to be as easy as putting on a great T-shirt. That’s why we partner with the best, ethical factories around the world. Source only the finest materials. And share those stories with you—down to the true cost of every product we make. It’s a new way of doing things. We call it Radical Transparency.
        </p>
      </div>

      {/* 3. SPLIT SECTION 1 (about2.png): Our Ethical Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-[#F9F8F6]">
        <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-gray-50">
          <img 
            src={aboutimg2} 
            alt="Our ethical approach" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-8 md:px-16 py-12">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">OUR APPROACH</span>
          <h2 className="text-2xl md:text-3xl font-normal mt-2 mb-4">Our ethical approach.</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We spend months finding the best factories around the globe—the very same ones that luxury brands use. We test every material for durability, safety, and comfort. Our standards are rigorous, and our commitment to fair wages is unwavering.
          </p>
        </div>
      </div>

       {/* 4. BLUEPRINT BANNER (about3.png) - Full Width */}
      <div className="w-full bg-[#F9F8F6] overflow-hidden">
        <img 
          src={aboutimg3}
          alt="Drafting and blueprint layout" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 5. SPLIT SECTION 2 (about4.png): Designed to Last */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white">
        <div className="px-8 md:px-16 py-12 order-2 md:order-1">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">QUALITY</span>
          <h2 className="text-2xl md:text-3xl font-normal mt-2 mb-4">Designed to last.</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            At Everlane, we’re not big on trends. We want you to wear our pieces for years, even decades, to come. That’s why we source the finest materials—from Grade-A cashmere to Supima cotton—built with exceptional craftsmanship.
          </p>
        </div>
        <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-gray-50 order-1 md:order-2">
          <img 
            src={aboutimg4}
            alt="Designed to last" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 6. FULL WIDTH BANNER (about5.png) */}
      <div className="w-full bg-white overflow-hidden">
        <img 
          src={aboutimg5}
          alt="Additional manufacturing process" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 7. TRANSPARENCY PRICING SECTION (Using stb.png) */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-gray-200">
        <div className="w-full flex justify-center items-center overflow-hidden">
          <img 
            src={stbImg} 
            alt="Traditional vs Everlane Pricing Breakdown" 
            className="w-full h-auto object-contain max-h-[400px]"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">PRICING</span>
          <h2 className="text-2xl md:text-3xl font-normal mt-2 mb-4">Radically Transparent.</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Traditional retail markups are massive. A $50 shirt costs $10 to make, but retail stores sell it for $100. We do things differently. We reveal our true costs, from materials and labor to duties and transport, so you know exactly what you’re paying for.
          </p>
        </div>
      </div>

      {/* 8. STORES SECTION (Added with ss1 to ss9 images) */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-b border-gray-200">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">LOCATIONS</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mt-2 mb-3">Stores</h2>
          <p className="text-sm md:text-base text-gray-600 font-light">
            Find one of our 11 stores nearest you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {storesList.map((store) => (
            <div key={store.id} className="group cursor-pointer flex flex-col">
              <div className="w-full h-[320px] sm:h-[360px] bg-neutral-100 overflow-hidden mb-4">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-mono block mb-1">
                  {store.city}
                </span>
                <h3 className="text-base font-normal tracking-wide text-gray-900">
                  {store.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. MORE TO EXPLORE SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-center text-xl font-normal tracking-wide mb-10">More to Explore</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Link to="/men" className="group block">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-3">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" 
                alt="Our Products" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <h4 className="text-sm font-medium text-center text-gray-900">Our Products</h4>
          </Link>

          <Link to="/men" className="group block">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-3">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" 
                alt="Hot Styles" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <h4 className="text-sm font-medium text-center text-gray-900">Hot Styles</h4>
          </Link>

          <Link to="/about" className="group block">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-3">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop" 
                alt="Factories" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <h4 className="text-sm font-medium text-center text-gray-900">Our Factories</h4>
          </Link>

        </div>
      </div>

    </div>
  );
}