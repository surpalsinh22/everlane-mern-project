import React from 'react';

// Assets import from src/assets/
import boxImg from '../assets/box.png';
import angleImg from '../assets/angle.png';
import locationImg from '../assets/location.png';

const perksData = [
  {
    icon: boxImg,
    title: 'Complimentary Shipping',
    description: 'Enjoy free shipping on U.S. orders over $100.',
  },
  {
    icon: angleImg,
    title: 'Consciously Crafted',
    description: 'Designed with you and the planet in mind.',
  },
  {
    icon: locationImg,
    title: 'Come Say Hi',
    description: 'We have 11 stores across the U.S.',
  },
];

export default function BrandPerks() {
  return (
    <section className="bg-white text-black py-20 px-4 md:px-12 border-t mb-5 border-gray-100">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
        {perksData.map((perk, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            
            {/* Small Icon */}
            <div className="h-14 w-14 flex items-center justify-center">
              <img
                src={perk.icon}
                alt={perk.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Title */}
            <h4 className="text-sm md:text-base font-medium tracking-wide">
              {perk.title}
            </h4>

            {/* Description */}
            <p className="text-gray-500 text-xs md:text-sm font-light max-w-xs leading-relaxed">
              {perk.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}