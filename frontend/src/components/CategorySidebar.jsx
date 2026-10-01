import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

export default function CategorySidebar({
  category,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) {

  // Category list
  const menCategories = [
    {
      name: 'New',
      path: '/men',
    },
    {
      name: 'Tees',
      path: '/men/tees',
    },
    {
      name: 'Shirts',
      path: '/men/shirts',
    },
    {
      name: 'Pants',
      path: '/men/pants',
    },
  ];

  const womenCategories = [
    {
      name: 'New',
      path: '/women',
    },
    {
      name: 'Tees',
      path: '/women/tees',
    },
    {
      name: 'Sweaters',
      path: '/women/sweaters',
    },
    {
      name: 'Denim',
      path: '/women/denim',
    },
    {
      name: 'Shoes',
      path: '/women/shoes',
    },
  ];

  const categories =
    category === 'men'
      ? menCategories
      : womenCategories;

  // Colors
const colors = [
  { name: 'Black', hexcode: '#000000' },
{ name: 'Deep Navy', hexcode: '#0B1F3A' } ,
{ name: 'Khaki', hexcode: '#F0E68C' },
{ name: 'Heathered Chocolate Chip', hexcode: '#5A4636' },
{ name: 'Mid Indigo', hexcode: '#4B5D8C' },
{ name: 'Taupe Melange', hexcode: '#8B8176' },
{ name: 'Burnished Lilac', hexcode: '#9A7F9E' },
{ name: 'Fiery Red', hexcode: '#B22222' },
{ name: 'Blush Tan', hexcode: '#D8B4A0' },
{ name: 'Golden Glow', hexcode: '#D4A72C' },
{ name: 'Overland', hexcode: '#8A9A5B' },
{ name: 'Navy', hexcode: '#000080' }
];

  // Waist sizes
  const waistSizes = [
    '28',
    '30',
    '32',
    '34',
    '36',
];

  // Clothing sizes
  const clothingSizes = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL',
  ];

  return (
    <aside className="w-full md:w-48 lg:w-52 flex-shrink-0">

      {/* CATEGORY */}

      <div className="border-t border-gray-200 py-5">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">
            Category
          </h2>

          <ChevronUp className="w-4 h-4" />
        </div>

        <div className="flex flex-col gap-3">

          {categories.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </div>

        <button
          type="button"
          className="text-xs text-gray-500 mt-3"
        >
          View More +
        </button>

      </div>

      {/* COLOR */}

      <div className="border-t border-gray-200 py-5">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold">
            Color
          </h2>

          <ChevronUp className="w-4 h-4" />
        </div>

        <div className="grid grid-cols-3 gap-y-5">

          {colors.map((color) => {
            const isSelected =
              selectedColor === color.hexcode;

            return (
              <button
                key={color.hexcode}
                type="button"
                onClick={() =>
                  onColorChange(
                    isSelected ? '' : color.hexcode
                  )
                }
                title={color.name}
                className="flex justify-center"
              >
                <span
                  className={`w-7 h-7 rounded-full ${
                    isSelected
                      ? 'ring-2 ring-black ring-offset-2'
                      : ''
                  }`}
                  style={{
                    backgroundColor: color.hexcode,
                  }}
                />
              </button>
            );
          })}

        </div>

        <button
          type="button"
          className="text-xs text-gray-500 mt-4"
        >
          View More +
        </button>

      </div>

      {/* SIZE */}

      <div className="border-t border-gray-200 py-5">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold">
            Size
          </h2>

          <ChevronUp className="w-4 h-4" />
        </div>

        {/* Waist */}

        <p className="text-xs text-gray-500 mb-3">
          Waist
        </p>

        <div className="grid grid-cols-4 gap-1 mb-6">

          {waistSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                onSizeChange(
                  selectedSize === size ? '' : size
                )
              }
              className={`h-9 text-xs ${
                selectedSize === size
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}

        </div>

        {/* Clothing */}

        <p className="text-xs text-gray-500 mb-3">
          Clothing
        </p>

        <div className="grid grid-cols-4 gap-1">

          {clothingSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                onSizeChange(
                  selectedSize === size ? '' : size
                )
              }
              className={`h-9 text-xs ${
                selectedSize === size
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}

        </div>

      </div>

    </aside>
  );
}