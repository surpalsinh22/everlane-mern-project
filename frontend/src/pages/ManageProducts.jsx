import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/productApi';
import { useNavigate } from 'react-router-dom';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          'Failed to fetch products'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteProduct(id);

      if (response.success) {
        setMessage('Product deleted successfully');

        setProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          'Failed to delete product'
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading products...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Manage Products
        </h1>

        <button
          onClick={() => navigate('/admin/add-product')}
          className="bg-black text-white px-5 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-5 p-3 border rounded">
          {message}
        </div>
      )}

      {/* No Products */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr className="border-b">

                <th className="text-left p-3">
                  Image
                </th>

                <th className="text-left p-3">
                  Title
                </th>

                <th className="text-left p-3">
                  Category
                </th>

                <th className="text-left p-3">
                  Subcategory
                </th>

                <th className="text-left p-3">
                  Price
                </th>

                <th className="text-left p-3">
                  Stock
                </th>

                <th className="text-left p-3">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b"
                >

                  {/* Image */}
                  <td className="p-3">
                    {product.images?.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  {/* Title */}
                  <td className="p-3">
                    {product.title}
                  </td>

                  {/* Category */}
                  <td className="p-3 capitalize">
                    {product.category}
                  </td>

                  {/* Subcategory */}
                  <td className="p-3 capitalize">
                    {product.subcategory}
                  </td>

                  {/* Price */}
                  <td className="p-3">
                    ₹{product.price}
                  </td>

                  {/* Stock */}
                  <td className="p-3">
                    {product.stock}
                  </td>

                  {/* Actions */}
                  <td className="p-3">

                    <div className="flex gap-2">

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/products/edit/${product._id}`
                          )
                        }
                        className="border px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}