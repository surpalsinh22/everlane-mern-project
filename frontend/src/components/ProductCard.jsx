// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function ProductCard({ product }) {
//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="group block"
//     >

//       {/* Product Image */}
//       <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">

//         {/* First Image */}
//         <img
//           src={product.images?.[0]}
//           alt={product.title}
//           className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:opacity-0"
//         />

//         {/* Second Image */}
//         {product.images?.[1] && (
//           <img
//             src={product.images[1]}
//             alt={product.title}
//             className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"
//           />
//         )}

//       </div>

//       {/* Product Details */}
//       <div className="mt-3">

//         <h2 className="text-sm font-medium text-gray-900">
//           {product.title}
//         </h2>

//         <p className="text-sm text-gray-500 mt-1">
//           {product.subcategory}
//         </p>

//         {/* Price */}
//         <div className="flex items-center gap-2 mt-2">

//           <span className="text-sm font-medium">
//             Rs.{product.discountprice || product.price} INR
//           </span>

//           {product.discountprice && (
//             <span className="text-sm text-gray-400 line-through">
//               ₹{product.price}
//             </span>
//           )}

//         </div>

//         {/* Colors */}
//         {product.colors?.length > 0 && (
//           <div className="flex gap-2 mt-3">

//             {product.colors.map((color, index) => (
//               <span
//                 key={index}
//                 className="w-4 h-4 rounded-full border border-gray-300"
//                 style={{
//                   backgroundColor: color.hexcode
//                 }}
//                 title={color.name}
//               />
//             ))}

//           </div>
//         )}

//       </div>

//     </Link>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { handleAddToCart } = useCart();

  const handleAdd = async (e) => {
    // Link par click hone se rokega
    e.preventDefault();
    e.stopPropagation();

    try {
      const size = product.sizes?.[0] || '';
      const color = product.colors?.[0] || null;

      if (!size) {
        alert('Please select a size');
        return;
      }

      const cartData = {
        productId: product._id,
        quantity: 1,
        size,
        color,
      };

      const response = await handleAddToCart(cartData);

      if (response?.success) {
        alert('Product added to bag');
      }
    } catch (error) {
      console.error('Error adding product to bag:', error);

      alert(
        error.response?.data?.message ||
        'Failed to add product to bag'
      );
    }
  };

  return (
    <div className="group block">

      {/* Product Image */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">

        {/* First Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="
              absolute inset-0
              w-full h-full
              object-cover
              transition-all duration-500 ease-in-out
              group-hover:opacity-0
            "
          />

          {/* Second Image */}
          {product.images?.[1] && (
            <img
              src={product.images[1]}
              alt={product.title}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                opacity-0
                transition-all duration-500 ease-in-out
                group-hover:opacity-100
              "
            />
          )}
        </Link>

        {/* Hover Add To Bag */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-3
            opacity-0
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all duration-300
          "
        >
          <button
            type="button"
            onClick={handleAdd}
            className="
              w-full
              bg-white
              text-black
              py-3
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-semibold
              tracking-wide
              shadow-md
              hover:bg-black
              hover:text-white
              transition-colors duration-300
            "
          >
            <ShoppingBag className="w-4 h-4" />
            ADD TO BAG
          </button>
        </div>

      </div>

      {/* Product Details */}
      <Link to={`/product/${product._id}`}>
        <div className="mt-3">

          {/* Title */}
          <h2 className="text-sm font-medium text-gray-900">
            {product.title}
          </h2>

          {/* Subcategory */}
          <p className="text-sm text-gray-500 mt-1 capitalize">
            {product.subcategory}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">

            <span className="text-sm font-medium">
              ₹{product.discountprice || product.price} INR
            </span>

            {product.discountprice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price}
              </span>
            )}

          </div>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="flex gap-2 mt-3">

              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: color.hexcode,
                  }}
                  title={color.name}
                />
              ))}

            </div>
          )}

        </div>
      </Link>

    </div>
  );
}