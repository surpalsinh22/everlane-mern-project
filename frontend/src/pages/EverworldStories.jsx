import React from 'react';
import { Link } from 'react-router-dom';

// Main Images import
import ev1 from '../assets/ev1.png';
import ev2 from '../assets/ev2.png';
import ev3 from '../assets/ev3.png';

// Bottom 3 Stories/Edit images import
import evv1 from '../assets/evv1.png';
import evv2 from '../assets/evv2.png';
import evv3 from '../assets/evv3.png';

export default function EverworldStories() {
  return (
    <div className="w-full bg-white font-sans text-neutral-900 pb-28">
      
      {/* 1. HERO BANNER SECTION */}
      <div className="relative w-full h-[65vh] md:h-[80vh] bg-neutral-900 overflow-hidden">
        <img
          src={ev1}
          alt="Style How To Style Winter Whites"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16 lg:p-20">
          <span className="text-xs uppercase tracking-[0.35em] text-white/90 font-medium mb-3">
            Style
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1] mb-4">
            How To Style Winter Whites
          </h1>
          <p className="text-white/90 font-light text-base md:text-lg tracking-wide max-w-2xl">
            Redefine your winter wardrobe with the timeless elegance of winter whites.
          </p>
        </div>
      </div>

      {/* 2. INTRO PARAGRAPH SECTION */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-6 text-neutral-900">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-900"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
        </div>
        <p className="text-neutral-900 font-normal text-lg md:text-xl leading-relaxed">
          In a season dominated by dark hues, redefine your winter wardrobe with the timeless elegance of winter whites. Whether top-to-toe white outfits, tonal mixing-and-matching, or a key white piece (or two), give your style a breath of fresh air with this list of winter white closet essentials.
        </p>
      </div>

      {/* 3. SECOND IMAGE (ev2.png) - Full body visible from head to boots */}
      <div className="max-w-4xl mx-auto px-6 my-10">
        <div className="w-full bg-[#f4f4f4] flex items-center justify-center overflow-hidden shadow-sm p-4 md:p-8">
          <img
            src={ev2}
            alt="Winter White Outfit Look"
            className="w-full h-auto max-h-[85vh] object-contain object-center"
          />
        </div>
      </div>

      {/* 4. CONTENT SECTIONS (Nail the Classics, Monochromatic Magic, Keep Warm in White) */}
      <div className="max-w-2xl mx-auto px-6 space-y-14 text-neutral-900 my-16">
        
        {/* Section 1 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-normal text-neutral-900 mb-4 tracking-tight">
            Nail the Classics
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light">
            Start with what you know. A{' '}
            <span className="underline decoration-neutral-400 underline-offset-4 cursor-pointer hover:text-neutral-900 font-normal text-neutral-900">
              structured wool coat in crisp ivory
            </span>{' '}
            throws an instant layer of polish over any look. Pair it with a chunky cream knit sweater and tailored trousers for a seamless look. Don't be afraid to mix shades—bone, ecru, and snow white all play well together when textured fabrics like cable-knit and cashmere are involved.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-normal text-neutral-900 mb-4 tracking-tight">
            Monochromatic Magic
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light mb-4">
            Pulling off an all-white look is easier than you think. The trick is to play with textures so your outfit doesn't fall flat. Try pairing sleek silk trousers with a heavy ribbed turtleneck or an oversized fleece jacket.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light">
            Ground your look with a{' '}
            <span className="underline decoration-neutral-400 underline-offset-4 cursor-pointer hover:text-neutral-900 font-normal text-neutral-900">
              dark brown leather belt or boots
            </span>{' '}
            to break up the brightness and give your outfit a grounded, seasonal anchor.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-normal text-neutral-900 mb-4 tracking-tight">
            Keep Warm in White
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light">
            The cold weather doesn't mean you have to pack away the lighter tones. In fact, wearing white in winter feels elevated and intentional. Look for heavy-duty outerwear like a padded puffer or a shearling-lined jacket in off-white shades to stay cozy while keeping your look impeccably fresh.
          </p>
        </div>

      </div>

      {/* 5. THIRD IMAGE (ev3.png) - Full body visible from head to boots */}
      <div className="max-w-4xl mx-auto px-6 my-16">
        <div className="w-full bg-[#f4f4f4] flex items-center justify-center overflow-hidden shadow-sm p-4 md:p-8">
          <img
            src={ev3}
            alt="Winter Puffer Style Look"
            className="w-full h-auto max-h-[85vh] object-contain object-center"
          />
        </div>
      </div>

      {/* 6. MORE TEXT SECTIONS (Textures and Layers, Accessories with Neutrals) */}
      <div className="max-w-2xl mx-auto px-6 space-y-14 text-neutral-900 my-16">
        
        {/* Section 4 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-normal text-neutral-900 mb-4 tracking-tight">
            Textures and Layers
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light">
            A key element for mastering winter whites is layering with contrasting fabrics. Pair smooth cotton denim with chunky knitwear, or sleek leather accessories with soft fleece. This adds visual depth to your outfit without needing dark colors to anchor it.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-normal text-neutral-900 mb-4 tracking-tight">
            Accessories with Neutrals
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light mb-4">
            When starting with monochrome outfits, subtle accents like a{' '}
            <span className="underline decoration-neutral-400 underline-offset-4 cursor-pointer hover:text-neutral-900 font-normal text-neutral-900">
              leather handbag or neutral scarf
            </span>{' '}
            can effortlessly pull the entire ensemble together.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-light">
            To keep your winter whites pristine all day, keep a travel-friendly stain remover pen handy in your bag—just in case!
          </p>
        </div>

      </div>

      {/* 7. BOTTOM 3 STORIES / EDIT GRID (evv1, evv2, evv3) */}
      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-200 pt-20 mt-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Item 1 */}
          <div className="group cursor-pointer">
            <div className="w-full h-[450px] md:h-[500px] bg-[#f4f4f4] flex items-center justify-center overflow-hidden mb-5 p-2">
              <img
                src={evv1}
                alt="How To Style Winter Whites"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2">
              Style
            </span>
            <h3 className="text-xl font-normal tracking-tight group-hover:underline text-neutral-900">
              How To Style Winter Whites
            </h3>
          </div>

          {/* Item 2 */}
          <div className="group cursor-pointer">
            <div className="w-full h-[450px] md:h-[500px] bg-[#f4f4f4] flex items-center justify-center overflow-hidden mb-5 p-2">
              <img
                src={evv2}
                alt="Women's Holiday Gifting"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2">
              Holiday Gifting
            </span>
            <h3 className="text-xl font-normal tracking-tight group-hover:underline text-neutral-900">
              Women's Holiday Gifting Guide
            </h3>
          </div>

          {/* Item 3 */}
          <div className="group cursor-pointer">
            <div className="w-full h-[450px] md:h-[500px] bg-[#f4f4f4] flex items-center justify-center overflow-hidden mb-5 p-2">
              <img
                src={evv3}
                alt="Sustainable Denim"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2">
              Sustainability
            </span>
            <h3 className="text-xl font-normal tracking-tight group-hover:underline text-neutral-900">
              Reimagining Denim For Everyone
            </h3>
          </div>

        </div>
      </div>

    </div>
  );
}