
import React, { useEffect, useState } from 'react';
import {
  createProduct,
  getProductById,
  updateProduct
} from '../api/productApi';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountprice: '',
    category: '',
    subcategory: '',
    sizes: [],
    colors: [],
    tags: [],
    stock: 10
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [colorName, setColorName] = useState('');
  const [colorHexcode, setColorHexcode] = useState('');

  const [tagInput, setTagInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [message, setMessage] = useState({ text: '', type: '' });

  const sizeOptions = {
    men: {
      shirts: ['S', 'M', 'L', 'XL', 'XXL'],
      tees: ['S', 'M', 'L', 'XL', 'XXL'],
      pants: ['28', '30', '32', '34', '36', '38']
    },
      women: {
    tees: ['XS', 'S', 'M', 'L', 'XL'],
    denim: ['26', '28', '30', '32', '34', '36'],
    sweaters: ['XS', 'S', 'M', 'L', 'XL'],
    shoes: ['5', '6', '7', '8', '9', '10']
      }
  };

  const availableSizes =
    sizeOptions[formData.category]?.[formData.subcategory] || [];

  // Edit mode me existing product fetch karna
  useEffect(() => {
    if (!id) {
      setFetchLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setFetchLoading(true);
        setMessage({ text: '', type: '' });

        const response = await getProductById(id);

        if (response.success) {
          const product = response.data;

          setFormData({
            title: product.title || '',
            description: product.description || '',
            price: product.price || '',
            discountprice: product.discountprice || '',
            category: product.category || '',
            subcategory: product.subcategory || '',
            sizes: product.sizes || [],
            colors: product.colors || [],
            tags: product.tags || [],
            stock: product.stock ?? 10
          });

          setExistingImages(product.images || []);
        }
      } catch (error) {
        console.error(error);
        setMessage({
          text: error.response?.data?.message || 'Failed to load product',
          type: 'error'
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'category' || name === 'subcategory') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        sizes: []
      }));
    }
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const alreadySelected = prev.sizes.includes(size);

      return {
        ...prev,
        sizes: alreadySelected
          ? prev.sizes.filter((item) => item !== size)
          : [...prev.sizes, size]
      };
    });
  };

  const addColor = () => {
    if (!colorName.trim() || !colorHexcode.trim()) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          name: colorName.trim(),
          hexcode: colorHexcode.trim()
        }
      ]
    }));

    setColorName('');
    setColorHexcode('');
  };

  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (!tagInput.trim()) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }));

    setTagInput('');
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });

      const data = new FormData();

      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('discountprice', formData.discountprice);
      data.append('category', formData.category);
      data.append(
        'subcategory',
        formData.subcategory.trim().toLowerCase()
      );

      data.append('sizes', JSON.stringify(formData.sizes));
      data.append('colors', JSON.stringify(formData.colors));
      data.append('tags', JSON.stringify(formData.tags));
      data.append('stock', formData.stock);

      images.forEach((image) => {
        data.append('images', image);
      });

      let response;

      if (isEditMode) {
        response = await updateProduct(id, data);
      } else {
        response = await createProduct(data);
      }

      if (response.success) {
        setMessage({
          text: isEditMode
            ? 'Product updated successfully!'
            : 'Product added successfully!',
          type: 'success'
        });

        if (!isEditMode) {
          setFormData({
            title: '',
            description: '',
            price: '',
            discountprice: '',
            category: '',
            subcategory: '',
            sizes: [],
            colors: [],
            tags: [],
            stock: 10
          });

          setImages([]);
          setColorName('');
          setColorHexcode('');
          setTagInput('');
        }
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || 'Something went wrong',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent mb-2"></div>
          <p className="text-gray-600 font-medium">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 md:p-10">
        
    {/* Header */}
<div className="border-b border-gray-100 pb-5 mb-8">

  <button
    type="button"
    onClick={() => navigate('/admin/products')}
    className="mb-4 text-sm text-gray-600 hover:text-black flex items-center gap-2"
  >
    ← Back to Products
  </button>

  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
    {isEditMode ? 'Edit Product' : 'Add New Product'}
  </h1>

  <p className="text-sm text-gray-500 mt-1">
    {isEditMode
      ? 'Update product information and inventory details'
      : 'Fill in the information below to create a new product item'}
  </p>

</div>

        {/* Status Message Banner */}
        {message.text && (
          <div
            className={`mb-8 p-4 rounded-lg text-sm font-medium flex items-center justify-between transition-all ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            <span>{message.text}</span>
            <button 
              onClick={() => setMessage({ text: '', type: '' })}
              className="text-lg font-bold px-2 hover:opacity-70"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Oversized Heavyweight Tee"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Provide a detailed description of the product..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-y"
            />
          </div>

          {/* Price & Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount Price ($)
              </label>
              <input
                type="number"
                name="discountprice"
                value={formData.discountprice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Category & Subcategory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              >
                <option value="">Select Category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="child">Child</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              >
                <option value="">Select Subcategory</option>
                {formData.category === 'men' && (
                  <>
                    <option value="shirts">Shirts</option>
                    <option value="tees">Tees</option>
                    <option value="pants">Pants</option>
                  </>
                )}
               {formData.category === 'women' && (
  <>
    <option value="tees">Tees</option>
    <option value="denim">Denim</option>
    <option value="sweaters">Sweaters</option>
    <option value="shoes">Shoes</option>
  </>
)}
                {formData.category === 'child' && (
                  <>
                    <option value="shirts">Shirts</option>
                    <option value="tees">Tees</option>
                    <option value="pants">Pants</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Sizes Checkboxes */}
          {availableSizes.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                  <label
                    key={size}
                    className={`flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer transition ${
                      formData.sizes.includes(size)
                        ? 'bg-black text-white border-black font-medium'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.sizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="hidden"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Colors Section */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Colors
            </label>
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Color Name (e.g. Navy)"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Hex Code (#000000)"
                value={colorHexcode}
                onChange={(e) => setColorHexcode(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={addColor}
                className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Add Color
              </button>
            </div>

            {formData.colors.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm"
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                      style={{ backgroundColor: color.hexcode }}
                    />
                    <span className="text-sm font-medium text-gray-800">{color.name}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="text-gray-400 hover:text-red-600 font-bold ml-1"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags Section */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tags
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Enter tag (e.g. summer, casual)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black flex-1 md:max-w-xs"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Add Tag
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1 flex items-center gap-2 shadow-sm text-sm"
                  >
                    <span className="text-gray-800">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-gray-400 hover:text-red-600 font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Existing Images (Edit Mode) */}
          {isEditMode && existingImages.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Current Images
              </label>
              <div className="flex flex-wrap gap-4">
                {existingImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product thumbnail"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Image Upload Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isEditMode ? 'Upload New Images (Optional)' : 'Product Images'} <span className="text-red-500">{!isEditMode && '*'}</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required={!isEditMode}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
            />
            {isEditMode && (
              <p className="text-xs text-gray-500 mt-2">
                Note: If you don't select new images, existing images will be preserved.
              </p>
            )}
          </div>

          {/* Selected New Images List */}
          {images.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Selected New Images ({images.length}):
              </p>
              <ul className="list-disc list-inside text-xs text-blue-800 space-y-0.5">
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-lg shadow-sm disabled:opacity-50 transition"
            >
              {loading
                ? isEditMode
                  ? 'Updating Product...'
                  : 'Creating Product...'
                : isEditMode
                ? 'Update Product'
                : 'Add Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}