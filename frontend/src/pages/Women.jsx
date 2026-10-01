// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getProducts, getNewProducts } from '../api/productApi';
// import ProductCard from '../components/ProductCard';
// import CategorySidebar from '../components/CategorySidebar';

// export default function Women() {
//   const { subCategory } = useParams();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');

//   useEffect(() => {
//     const fetchWomenProducts = async () => {
//       try {
//         setLoading(true);
//         setMessage('');

//         let res;

//         if (subCategory) {
//           const params = {
//             category: 'women',
//             subCategory: subCategory,
//           };

//           if (selectedColor) params.color = selectedColor;
//           if (selectedSize) params.size = selectedSize;

//           res = await getProducts(params);
//         } else {
//           res = await getNewProducts('women');
//         }

//         if (res.success) {
//           setProducts(res.data);
//         }
//       } catch (error) {
//         setMessage(
//           error.response?.data?.message || 'Failed to load products'
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWomenProducts();
//   }, [subCategory, selectedColor, selectedSize]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="flex flex-col md:flex-row gap-8">
//         <CategorySidebar
//           category="women"
//           selectedColor={selectedColor}
//           selectedSize={selectedSize}
//           onColorChange={setSelectedColor}
//           onSizeChange={setSelectedSize}
//         />

//         <main className="flex-1">
//           <h1 className="text-3xl font-semibold mb-8">
//             {subCategory
//               ? subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
//               : 'Women'}
//           </h1>

//           {loading && <p>Loading products...</p>}

//           {message && <p className="text-red-500 mb-6">{message}</p>}

//           {!loading && products.length === 0 && <p>No products found.</p>}

//           {!loading && products.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-10">
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getProducts,
  getNewProducts
} from '../api/productApi';

import ProductCard from '../components/ProductCard';
import CategorySidebar from '../components/CategorySidebar';

export default function Women() {
  const { subCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        setLoading(true);
        setMessage('');

        let res;

        // Subcategory page
        if (subCategory) {
          const params = {
            category: 'women',
            subCategory: subCategory
          };

          // Color filter
          if (selectedColor) {
            params.color = selectedColor;
          }

          // Size filter
          if (selectedSize) {
            params.size = selectedSize;
          }

          res = await getProducts(params);

        } else {
          // New page
          const params = {};

          // Color filter
          if (selectedColor) {
            params.color = selectedColor;
          }

          // Size filter
          if (selectedSize) {
            params.size = selectedSize;
          }

          res = await getNewProducts(
            'women',
            params
          );
        }

        if (res.success) {
          setProducts(res.data);
        }

      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          'Failed to load products'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();

  }, [
    subCategory,
    selectedColor,
    selectedSize
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex flex-col md:flex-row gap-8">

        <CategorySidebar
          category="women"
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
        />

        <main className="flex-1">

          <h1 className="text-3xl font-semibold mb-8">
            {subCategory
              ? subCategory.charAt(0).toUpperCase() +
                subCategory.slice(1)
              : 'Women'}
          </h1>

          {loading && (
            <p>Loading products...</p>
          )}

          {message && (
            <p className="text-red-500 mb-6">
              {message}
            </p>
          )}

          {!loading &&
            products.length === 0 && (
              <p>No products found.</p>
            )}

          {!loading &&
            products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-10">

                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}

              </div>
            )}

        </main>

      </div>

    </div>
  );
}