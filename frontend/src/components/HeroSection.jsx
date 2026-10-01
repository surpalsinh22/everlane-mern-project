import React from 'react';
import heroImg from '../assets/hero.png';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[75vh] md:h-[88vh] bg-black overflow-hidden flex items-center">
      
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Your Cozy Era"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Left Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-24">
        <div className="max-w-md text-left text-white">
          
          {/* Main Title */}
          <h1 className="text-3xl ml-5 sm:text-4xl md:text-5xl font-sans font-normal lg:ml-0  text-white mb-4  tracking-[1px]">
            Your Cozy Era
          </h1>

          {/* Paragraph (Spaced out & Readable) */}
          <p className="text-base sm:text-lg md:text-[22px] font-sans font-light  mb-9 leading-relaxed tracking-wide">
           <span className='ml-6 tracking-[2px]'>Get peak comfy-chic </span> <br />
           <span className='tracking-[2px]'> with new winter essentials.</span>
          </p>

          {/* Crisp Rectangular Button */}
<Link
  to="/men"
  className="inline-block bg-white text-black font-sans font-semibold text-[11px] tracking-[0.25em] lg:ml-5 uppercase px-20 py-3.5 rounded-none hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
>
  SHOP NOW
</Link>

        </div>
      </div>

    </section>
  );
}