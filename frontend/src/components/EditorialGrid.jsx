import React from 'react';
import { Link } from 'react-router-dom';

// Assets import from src/assets/
import yellowImg from '../assets/yellowimg.png';
import cleanerFashionImg from '../assets/cleanerfashion.png';

const promoData = [
  {
    title: 'Our Holiday Gift Picks',
    image: yellowImg,
    description: 'The best presents for everyone on your list.',
    linkText: 'Read More',
    path: '/holiday-gifts',
  },
  {
    title: 'Cleaner Fashion',
    image: cleanerFashionImg,
    description: 'See the sustainability efforts behind each of our products.',
    linkText: 'Learn More',
    path: '/cleaner-fashion',
  },
];

export default function EditorialGrid() {
  return (
    <section className="bg-white text-black py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {promoData.map((item, index) => (
          <div key={index} className="flex flex-col space-y-4">
            
            {/* Top Title */}
            <h3 className="text-center text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-normal">
              {item.title}
            </h3>

            {/* Image Container with Custom Height & Width */}
            <Link 
              to={item.path} 
              className="group overflow-hidden block w-full h-[320px] md:h-[600px] cursor-pointer bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </Link>

            {/* Bottom Description & Link */}
            <div className="text-center space-y-2 pt-1">
              <p className="text-gray-600 text-xs md:text-sm font-light">
                {item.description}
              </p>
              <Link
                to={item.path}
                className="inline-block text-xs uppercase tracking-[0.2em] text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                {item.linkText}
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}