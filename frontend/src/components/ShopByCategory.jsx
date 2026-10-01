import React from 'react';
import { Link } from 'react-router-dom';

// Assets import from src/assets/
import shirtImg from '../assets/shirt.png';
import denimImg from '../assets/denim.png';
import teesImg from '../assets/tees.png';
import pantsImg from '../assets/pants.png';
import sweatersImg from '../assets/sweaters.png';
import outerwearImg from '../assets/outwear.png';

const categories = [
  { name: 'SHIRTS', image: shirtImg, path: '/men/shirts' },
  { name: 'DENIM', image: denimImg, path: '/women/denim' },
  { name: 'TEES', image: teesImg, path: '/men/tees' },
  { name: 'PANTS', image: pantsImg, path: '/men/pants' },
  { name: 'SWEATERS', image: sweatersImg, path: '/women/sweaters' },
  { name: 'OUTERWEAR', image: outerwearImg, path: '/men/outerwear' },
];

export default function ShopByCategory() {
  return (
    <section className="bg-white text-black py-16 px-4 md:px-12">
      <div className="max-w-[1400px] mx-auto space-y-10">

        {/* Section Title */}
        <h2 className="text-center text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-normal">
          Shop by Category
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-4">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.path}
              className="group flex flex-col space-y-3 cursor-pointer"
            >

              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Category Label */}
              <span className="text-center text-xs uppercase tracking-[0.15em] text-gray-600 group-hover:text-black transition-colors">
                {cat.name}
              </span>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}