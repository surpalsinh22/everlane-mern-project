import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getProductById, getProducts } from '../api/productApi';

import { useCart } from '../context/CartContext';

import ProductCard from '../components/ProductCard';

import gift from '../assets/gift.png';
import truck from '../assets/truck.png';
import returnIcon from '../assets/return.png';

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  // CartContext se add to cart function
  const { handleAddToCart: addProductToCart } = useCart();

  const perks = [
    {
      image: truck,
      title: 'Free Shipping',
      text: 'Enjoy free shipping on orders over Rs.2500 with fast delivery.',
    },
    {
      image: returnIcon,
      title: 'Easy Returns',
      text: 'Easy and hassle-free returns within 30 days of purchase.',
    },
    {
      image: gift,
      title: 'Consciously Crafted',
      text: 'Thoughtfully crafted with quality materials and certified factories.',
    },
  ];

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await getProductById(id);

        if (res.success) {
          const productData = res.data;

          setProduct(productData);

          // Default size
          if (productData.sizes?.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }

          // Default color
          if (productData.colors?.length > 0) {
            setSelectedColor(productData.colors[0]);
          }

          // Get related products
          const relatedRes = await getProducts({
            category: productData.category,
            subCategory: productData.subcategory,
          });

          if (relatedRes.success) {
            const related = relatedRes.data
              .filter((item) => item._id !== productData._id)
              .slice(0, 4);

            setRelatedProducts(related);
          }
        }
      } catch (err) {
        console.error('Product details error:', err);

        setError(
          err.response?.data?.message ||
            'Failed to load product details'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Add product to cart
  const handleAddToCart = async () => {
    try {
      // Check size
      if (product.sizes?.length > 0 && !selectedSize) {
        alert('Please select a size');
        return;
      }

      // Check color
      if (product.colors?.length > 0 && !selectedColor) {
        alert('Please select a color');
        return;
      }

      setAddingToCart(true);

      const cartData = {
        productId: product._id,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      };

      // Context ke through add to cart
      const res = await addProductToCart(cartData);

      if (res.success) {
        alert('Product added to cart');
      }
    } catch (err) {
      console.error('Add to cart error:', err);

      if (err.response?.status === 401) {
        alert('Please login to add products to cart');
      } else {
        alert(
          err.response?.data?.message ||
            'Failed to add product to cart'
        );
      }
    } finally {
      setAddingToCart(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product details...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">

      {/* Breadcrumb */}

      <div className="text-xs text-gray-500 mb-6">
        <Link
          to="/"
          className="hover:underline"
        >
          Home
        </Link>

        {' / '}

        <Link
          to={`/${product.category}`}
          className="hover:underline capitalize"
        >
          {product.category}
        </Link>

        {' / '}

        <span className="text-gray-900">
          {product.title}
        </span>
      </div>

      {/* Product details */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Product images */}

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">

          {product.images?.map((img, index) => (
            <div
              key={index}
              className={`bg-gray-100 overflow-hidden aspect-[3/4] ${
                index === 0
                  ? 'col-span-2 sm:col-span-1'
                  : ''
              }`}
            >
              <img
                src={img}
                alt={`${product.title} - ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
              />
            </div>
          ))}

        </div>

        {/* Product info */}

        <div className="lg:col-span-5 lg:pl-6">

          {/* Title */}

          <h1 className="text-2xl font-normal text-gray-900">
            {product.title}
          </h1>

          {/* Subcategory */}

          <p className="text-sm text-gray-500 mt-1 capitalize">
            {product.subcategory}
          </p>

          {/* Price */}

          <div className="flex items-center gap-3 mt-4">

            <span className="text-lg font-medium text-gray-900">
              Rs.{product.discountprice || product.price} INR
            </span>

            {product.discountprice && (
              <span className="text-sm text-gray-400 line-through">
                Rs.{product.price} INR
              </span>
            )}

          </div>

          {/* Colors */}

          {product.colors?.length > 0 && (
            <div className="mt-6">

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-2">
                Color:
                <span className="font-normal text-gray-500">
                  {' '}
                  {selectedColor?.name || 'Select'}
                </span>
              </span>

              <div className="flex gap-3">

                {product.colors.map((color, index) => {

                  const isSelected =
                    selectedColor?.hexcode === color.hexcode;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-7 h-7 rounded-full border border-gray-300 ring-offset-2 transition ${
                        isSelected
                          ? 'ring-2 ring-black'
                          : 'hover:ring-2 hover:ring-gray-400'
                      }`}
                      style={{
                        backgroundColor:
                          color.hexcode || '#ffffff',
                      }}
                    />
                  );
                })}

              </div>

            </div>
          )}

          {/* Sizes */}

          {product.sizes?.length > 0 && (
            <div className="mt-6">

              <div className="flex justify-between items-center mb-2">

                <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Size
                </span>

                <button
                  type="button"
                  className="text-xs text-gray-500 underline hover:text-black"
                >
                  Size Guide
                </button>

              </div>

              <div className="flex flex-wrap gap-2">

                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm border transition rounded-none ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-800 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>
          )}

          {/* Add to bag */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="w-full mt-8 bg-black text-white py-4 font-medium text-sm tracking-wider uppercase hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart
              ? 'ADDING TO BAG...'
              : 'ADD TO BAG'}
          </button>

          {/* Perks */}

          <div className="mt-8 border-t border-gray-200 pt-6 space-y-5 text-xs">

            {perks.map((perk, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >

                <img
                  src={perk.image}
                  alt={perk.title}
                  className="w-7 h-7 object-contain flex-shrink-0"
                />

                <div>

                  <strong className="block font-bold text-gray-900">
                    {perk.title}
                  </strong>

                  <span className="block text-gray-600 mt-1">
                    {perk.text}
                  </span>

                </div>

              </div>
            ))}

          </div>

          {/* Description */}

          <div className="mt-8 border-t border-gray-200 pt-6">

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-2">
              Product Description
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description ||
                'Designed for everyday wear, this piece combines timeless style with premium comfort. Crafted from high-grade materials to ensure durability and a sleek fit.'}
            </p>

          </div>

          {/* Materials & care */}

          <div className="mt-6 border-t border-gray-200 pt-6">

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-2">
              Materials & Care
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Machine wash cold. Tumble dry low. Do not bleach. Cool iron if needed.
            </p>

          </div>

        </div>
      </div>

      {/* More to love */}

      {relatedProducts.length > 0 && (
        <section className="mt-16 pb-16">

          <h2 className="text-2xl font-semibold mb-6">
            More to Love
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct._id}
                product={relatedProduct}
              />
            ))}

          </div>

        </section>
      )}

    </div>
  );
}