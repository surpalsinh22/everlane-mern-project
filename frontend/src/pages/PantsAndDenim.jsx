import React, { useEffect, useState } from 'react';

import {
  getTopsAndSweaters
} from '../api/productApi';

import ProductCard from '../components/ProductCard';

export default function TopsAndSweaters() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setMessage('');

        const res = await getTopsAndSweaters();

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

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold">
          Tops & Sweaters
        </h1>

        <p className="text-gray-500 mt-3">
          Explore our collection of women’s tees and sweaters.
        </p>
      </div>

      {loading && (
        <p>Loading products...</p>
      )}

      {message && (
        <p className="text-red-500 mb-6">
          {message}
        </p>
      )}

      {!loading && products.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
}