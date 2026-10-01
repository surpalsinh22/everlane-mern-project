import React, { useEffect, useState } from 'react';
import { getClothingProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';

export default function Clothing() {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [sort, setSort] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] =(useState(0));

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const productsPerPage = 8;

  useEffect(() => {
    const fetchClothingProducts = async () => {
      try {
        setLoading(true);
        setMessage('');

        const params = {
          page,
          limit: productsPerPage
        };

        if (category) params.category = category;
        if (subCategory) params.subCategory = subCategory;
        if (size) params.size = size;
        if (color) params.color = color;
        if (sort) params.sort = sort;

        const res = await getClothingProducts(params);

        if (res.success) {
          setProducts(res.data);
          setTotalPages(res.totalPages);
          setTotalProducts(res.totalProducts);
        }

      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          'Failed to load clothing products'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClothingProducts();
  }, [category, subCategory, size, color, sort, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSubCategory(''); // Reset subcategory on main category change
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 font-sans text-neutral-900 bg-white">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono mb-2 block">
          Curated Essentials
        </span>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          Clothing
        </h1>
        <p className="text-neutral-500 font-light mt-4 text-base leading-relaxed">
          Discover timeless clothing designed for everyday life, crafted with exceptional quality and ethical standards.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200">

        {/* CATEGORY */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
              category === ''
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900'
            }`}
          >
            All
          </button>

          <button
            onClick={() => handleCategoryChange('men')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
              category === 'men'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900'
            }`}
          >
            Men
          </button>

          <button
            onClick={() => handleCategoryChange('women')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
              category === 'women'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900'
            }`}
          >
            Women
          </button>
        </div>

        {/* EXTRA FILTERS (Size & Sort) */}
        <div className="flex items-center gap-3">
          {/* Size Filter */}
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              setPage(1);
            }}
            className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full outline-none focus:border-neutral-900 transition-colors cursor-pointer"
          >
            <option value="">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full outline-none focus:border-neutral-900 transition-colors cursor-pointer"
          >
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* PRODUCT COUNT */}
      {!loading && totalProducts > 0 && (
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-8">
          Showing {products.length} of {totalProducts} products
        </p>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <div className="animate-pulse text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono">
            Loading collection...
          </div>
        </div>
      )}

      {/* ERROR */}
      {message && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl mb-8 text-center font-light">
          {message}
        </div>
      )}

      {/* NO PRODUCTS */}
      {!loading && products.length === 0 && (
        <div className="text-center py-32 space-y-3">
          <h3 className="text-lg font-light">No clothing products found</h3>
          <p className="text-sm text-neutral-400 font-light">Try changing your filters or check back later.</p>
        </div>
      )}

      {/* PRODUCTS GRID */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div key={product._id} className="group transition-transform duration-500">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}