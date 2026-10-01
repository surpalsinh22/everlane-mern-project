import React from 'react';
import { Link } from 'react-router-dom';

// Assets import from src/assets/
import newArrivalsImg from '../assets/newarrivals.png';
import bestSellersImg from '../assets/bestsellers.png';
import holidayOutfitImg from '../assets/holidayoutfit.png';
import greenBannerImg from '../assets/green.png'; // Yahan file ka naam green.png kar diya hai
const banners = [
  {
    title: "New Arrivals",
    subtitle: "SHOP THE LATEST",
    image: newArrivalsImg,
    path: "/new-arrivals",
  },

  {
    title: "Best-Sellers",
    subtitle: "SHOP YOUR FAVORITES",
    image: bestSellersImg,
    path: "/best-sellers",
  },

  {
    title: "The Holiday Outfit",
    subtitle: "SHOP OCCASION",
    image: holidayOutfitImg,
    path: "/holiday-gifting",
  },
];

export default function PromoBanners() {
  return (
    <section className="bg-white py-10 px-4 md:px-12">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* 1. 3-Grid Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <Link
              key={index}
              to={banner.path}
              className="relative group overflow-hidden aspect-[3/4] block cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <h3 className="text-white text-2xl md:text-3xl font-light tracking-wide">
                  {banner.title}
                </h3>
                <span className="bg-white text-black text-xs uppercase tracking-[0.2em] font-medium px-6 py-3 transition-transform duration-300 group-hover:scale-105">
                  {banner.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 2. Single Green Image Banner (Neeche wala) */}
    {/* Single Green Image Banner with Text Overlay */}
<div className="relative group overflow-hidden w-full h-[300px] md:h-[300px]">
  {/* Background Image */}
  <img
    src={greenBannerImg}
    alt="Mission Banner"
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  />

  {/* Dark Overlay (Taaki text saaf dikhe image ke upar) */}
  <div className="absolute inset-0 bg-black/30" />

  {/* Text & Button Container (Absolute Positioning) */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
    <h2 className="text-white text-2xl md:text-4xl font-light tracking-wide max-w-2xl">
      We're on a Mission To Clean Up the Industry
    </h2>
    
    <p className="text-gray-200 text-xs md:text-sm font-light tracking-wider">
      Read about our progress in our latest Impact Report.
    </p>

    <button className="mt-2 bg-white text-black text-xs uppercase tracking-[0.2em] font-medium px-8 py-3 transition-transform duration-300 hover:scale-105">
      Learn More
    </button>
  </div>
</div>
      </div>
    </section>
  );
}