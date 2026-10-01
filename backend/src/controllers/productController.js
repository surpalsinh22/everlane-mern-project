import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

// Helper Function: Cloudinary par buffer stream karne ke liye
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: 'ecommerce/products' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// 1. CREATE PRODUCT (Admin Panel ke liye)
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountprice,
      category,
      subcategory,
      sizes,
      colors,
      tags,
      stock
    } = req.body;

    if (!title || !description || !price || !category || !subcategory) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.'
      });
    }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const uploadResult = await uploadToCloudinary(file.buffer);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    const parsedSizes = sizes ? JSON.parse(sizes) : [];
    const parsedColors = colors ? JSON.parse(colors) : [];
    const parsedTags = tags ? JSON.parse(tags) : [];

    const newProduct = new Product({
      title,
      description,
      price,
      discountprice: discountprice || null,
      category,
      subcategory,
      sizes: parsedSizes,
      colors: parsedColors,
      tags: parsedTags,
      images: imageUrls,
      stock: stock || 10
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });

  } catch (error) {
    console.error('Error in createProduct:', error);

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// 2. GET ALL PRODUCTS (Filters & Search ke sath - Frontend ke liye)
// export const getProducts = async (req, res) => {
//   try {
//     const { category, subCategory, size, sort } = req.query;

//     let query = {};

//     if (category) {
//       query.category = category;
//     }

//     if (subCategory) {
//       query.subcategory = subCategory;
//     }

//     if (size) {
//       query.sizes = size;
//     }

//     let productsQuery = Product.find(query);

//     if (sort === 'low-high') {
//       productsQuery = productsQuery.sort({ price: 1 });
//     } else if (sort === 'high-low') {
//       productsQuery = productsQuery.sort({ price: -1 });
//     } else {
//       productsQuery = productsQuery.sort({ createdAt: -1 });

//       // New page/category ke liye latest 12 products
//       if (category && !subCategory) {
//         productsQuery = productsQuery.limit(12);
//       }
//     }

//     const products = await productsQuery;

//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products
//     });

//   } catch (error) {
//     console.error('Error in getProducts:', error);

//     return res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };


// GET ALL PRODUCTS

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      size,
      color,
      search,
      sort
    } = req.query;

    let query = {};

    // ===============================
    // SEARCH
    // ===============================
    if (search && search.trim() !== "") {
      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i"
          }
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i"
          }
        },
        {
          subcategory: {
            $regex: search.trim(),
            $options: "i"
          }
        },
        {
          tags: {
            $regex: search.trim(),
            $options: "i"
          }
        }
      ];
    }

    // ===============================
    // CATEGORY FILTER
    // ===============================
    if (category) {
      query.category = category;
    }

    // ===============================
    // SUBCATEGORY FILTER
    // ===============================
    if (subCategory) {
      query.subcategory = subCategory;
    }

    // ===============================
    // SIZE FILTER
    // ===============================
    if (size) {
      query.sizes = size;
    }

    // ===============================
    // COLOR FILTER
    // ===============================
    if (color) {
      query["colors.hexcode"] = color;
    }

    // ===============================
    // PRODUCT QUERY
    // ===============================
    let productsQuery = Product.find(query);

    // ===============================
    // SORT
    // ===============================
    if (sort === "low-high") {
      productsQuery = productsQuery.sort({
        price: 1
      });

    } else if (sort === "high-low") {
      productsQuery = productsQuery.sort({
        price: -1
      });

    } else {
      productsQuery = productsQuery.sort({
        createdAt: -1
      });

      // Category page par latest 12 products
      // Search ke time limit mat lagao
      if (category && !subCategory && !search) {
        productsQuery = productsQuery.limit(12);
      }
    }

    const products = await productsQuery;

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error("Error in getProducts:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};



// 3. GET SINGLE PRODUCT BY ID (Product Detail Page ke liye)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({
      success: true,
      data: product
    });                              

  } catch (error) {
    console.error('Error in getProductById:', error);
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// GET NEW PRODUCTS
export const getNewProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const { color, size } = req.query;

    let subcategories = [];

    if (category === 'men') {
      subcategories = ['shirts', 'tees', 'pants'];
    } else if (category === 'women') {
      subcategories = ['tees', 'sweaters', 'denim', 'shoes'];
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const productsPerSubcategory = 4;

    const products = [];

    for (const subcategory of subcategories) {

      // Basic query
      const query = {
        category,
        subcategory
      };

      // Color filter
      if (color) {
        query['colors.hexcode'] = color;
      }

      // Size filter
      if (size) {
        query.sizes = size;
      }

      const subcategoryProducts = await Product.find(query)
        .sort({ createdAt: -1 })
        .limit(productsPerSubcategory);

      products.push(...subcategoryProducts);
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error('Error in getNewProducts:', error);

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


//GET CLOTH
// export const getClothingProducts = async (req, res) => {
//   try {
//     const {
//       category,
//       sort,
//       page = 1,
//       limit = 8
//     } = req.query;

//     let query = {
//       category: {
//         $in: ['men', 'women']
//       }
//     };

//     // Category filter
//     if (category) {
//       if (!['men', 'women'].includes(category)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid category'
//         });
//       }

//       query.category = category;
//     }

//     // Pagination
//     const currentPage = Math.max(Number(page), 1);
//     const productsPerPage = Math.min(Number(limit), 8);

//     const skip = (currentPage - 1) * productsPerPage;

//     // Total products
//     const totalProducts = await Product.countDocuments(query);

//     // Product query
//     let productsQuery = Product.find(query);

//     // Sorting
//     if (sort === 'low-high') {
//       productsQuery = productsQuery.sort({ price: 1 });
//     } else if (sort === 'high-low') {
//       productsQuery = productsQuery.sort({ price: -1 });
//     } else {
//       productsQuery = productsQuery.sort({ createdAt: -1 });
//     }

//     const products = await productsQuery
//       .skip(skip)
//       .limit(productsPerPage);

//     const totalPages = Math.ceil(
//       totalProducts / productsPerPage
//     );

//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       totalProducts,
//       currentPage,
//       totalPages,
//       productsPerPage,
//       data: products
//     });

//   } catch (error) {
//     console.error('Error in getClothingProducts:', error);

//     return res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };


export const getClothingProducts = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      size,
      color,
      sort,
      page = 1,
      limit = 8
    } = req.query;

    let query = {
      category: {
        $in: ['men', 'women']
      }
    };

    if (category) {
      query.category = category;
    }

    if (subCategory) {
      query.subcategory = subCategory;
    }

    if (size) {
      query.sizes = size;
    }

    if (color) {
      query['colors.hexcode'] = color;
    }

    const currentPage = Math.max(Number(page), 1);
    const productsPerPage = Math.min(Number(limit), 8);
    const skip = (currentPage - 1) * productsPerPage;

    const totalProducts = await Product.countDocuments(query);

    let productsQuery = Product.find(query);

    if (sort === 'low-high') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'high-low') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    const products = await productsQuery
      .skip(skip)
      .limit(productsPerPage);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      currentPage,
      totalPages,
      data: products
    });

  } catch (error) {
    console.error('Error in getClothingProducts:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export const getPantsAndDenimProducts = async (req, res) => {
  try {
    const {
      sort,
      page = 1,
      limit = 8
    } = req.query;

    // Men Pants + Women Denim
    const query = {
      $or: [
        {
          category: 'men',
          subcategory: 'pants'
        },
        {
          category: 'women',
          subcategory: 'denim'
        }
      ]
    };

    // Pagination
    const currentPage = Math.max(Number(page), 1);

    const productsPerPage = Math.min(
      Math.max(Number(limit), 1),
      8
    );

    const skip = (currentPage - 1) * productsPerPage;

    // Total products
    const totalProducts = await Product.countDocuments(query);

    // Product query
    let productsQuery = Product.find(query);

    // Sorting
    if (sort === 'low-high') {
      productsQuery = productsQuery.sort({
        price: 1
      });
    } else if (sort === 'high-low') {
      productsQuery = productsQuery.sort({
        price: -1
      });
    } else {
      productsQuery = productsQuery.sort({
        createdAt: -1
      });
    }

    // Get paginated products
    const products = await productsQuery
      .skip(skip)
      .limit(productsPerPage);

    // Total pages
    const totalPages = Math.ceil(
      totalProducts / productsPerPage
    );

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      currentPage,
      totalPages,
      productsPerPage,
      data: products
    });

  } catch (error) {
    console.error(
      'Error in getPantsAndDenimProducts:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
// // 5. UPDATE PRODUCT
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     const {
//       title,
//       description,
//       price,
//       discountprice,
//       category,
//       subcategory,
//       sizes,
//       colors,
//       tags,
//       stock
//     } = req.body;

//     const parsedSizes = sizes ? JSON.parse(sizes) : product.sizes;
//     const parsedColors = colors ? JSON.parse(colors) : product.colors;
//     const parsedTags = tags ? JSON.parse(tags) : product.tags;

//     let imageUrls = product.images;

//     if (req.files && req.files.length > 0) {
//       imageUrls = [];

//       for (let file of req.files) {
//         const uploadResult = await uploadToCloudinary(file.buffer);
//         imageUrls.push(uploadResult.secure_url);
//       }
//     }

//     product.title = title;
//     product.description = description;
//     product.price = price;
//     product.discountprice = discountprice || null;
//     product.category = category;
//     product.subcategory = subcategory;
//     product.sizes = parsedSizes;
//     product.colors = parsedColors;
//     product.tags = parsedTags;
//     product.stock = stock;
//     product.images = imageUrls;

//     const updatedProduct = await product.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Product updated successfully',
//       data: updatedProduct
//     });

//   } catch (error) {
//     console.error('Error in updateProduct:', error);

//     return res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };


//TOPS &  
export const getTopsAndSweaters = async (req, res) => {
  try {
    const products = await Product.find({
      category: 'women',
      subcategory: {
        $in: ['tees', 'sweaters']
      }
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error('Error in getTopsAndSweaters:', error);

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export const getTopsAndKnitwearProducts = async (req, res) => {
  try {
    const {
      category,
      sort,
      page = 1,
      limit = 8
    } = req.query;

    const currentPage = Math.max(Number(page), 1);

    const productsPerPage = Math.min(
      Math.max(Number(limit), 1),
      8
    );

    // Men Shirts + Men Tees
    // Women Tees + Women Sweaters
    let query = {
      $or: [
        {
          category: 'men',
          subcategory: {
            $in: ['shirts', 'tees']
          }
        },
        {
          category: 'women',
          subcategory: {
            $in: ['tees', 'sweaters']
          }
        }
      ]
    };

    // All / Men / Women
    if (category) {
      if (!['men', 'women'].includes(category)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category'
        });
      }

      if (category === 'men') {
        query = {
          category: 'men',
          subcategory: {
            $in: ['shirts', 'tees']
          }
        };
      }

      if (category === 'women') {
        query = {
          category: 'women',
          subcategory: {
            $in: ['tees', 'sweaters']
          }
        };
      }
    }

    const skip = (currentPage - 1) * productsPerPage;

    const totalProducts = await Product.countDocuments(query);

    let productsQuery = Product.find(query);

    if (sort === 'low-high') {
      productsQuery = productsQuery.sort({
        price: 1
      });
    } else if (sort === 'high-low') {
      productsQuery = productsQuery.sort({
        price: -1
      });
    } else {
      productsQuery = productsQuery.sort({
        createdAt: -1
      });
    }

    const products = await productsQuery
      .skip(skip)
      .limit(productsPerPage);

    const totalPages = Math.ceil(
      totalProducts / productsPerPage
    );

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      currentPage,
      totalPages,
      productsPerPage,
      data: products
    });

  } catch (error) {
    console.error(
      'Error in getTopsAndKnitwearProducts:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};



// 4. DELETE PRODUCT (Admin Panel ke liye)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error in deleteProduct:', error);
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

                                            
// 5. UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const {
      title,
      description,
      price,
      discountprice,
      category,
      subcategory,
      sizes,
      colors,
      tags,
      stock
    } = req.body;

    const parsedSizes = sizes ? JSON.parse(sizes) : product.sizes;
    const parsedColors = colors ? JSON.parse(colors) : product.colors;
    const parsedTags = tags ? JSON.parse(tags) : product.tags;

    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];

      for (let file of req.files) {
        const uploadResult = await uploadToCloudinary(file.buffer);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.discountprice = discountprice || null;
    product.category = category;
    product.subcategory = subcategory;
    product.sizes = parsedSizes;
    product.colors = parsedColors;
    product.tags = parsedTags;
    product.stock = stock;
    product.images = imageUrls;

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    console.error('Error in updateProduct:', error);

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};