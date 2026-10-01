import Cart from "../models/cartModel.js";
import Product from "../models/Product.js";


// ADD TO CART

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    const userId = req.user.id;

    // Required fields check
    if (!productId || !size || !color) {
      return res.status(400).json({
        success: false,
        message: "Product, size and color are required",
      });
    }

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({
      user: userId,
    });

    // If cart doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: userId,

        items: [
          {
            product: productId,
            quantity: quantity || 1,
            size,
            color,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        data: cart,
      });
    }

    // Check same product + same size + same color
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color.hexcode === color.hexcode
    );

    // If same item already exists
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
        size,
        color,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });

  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// GET CART
// ===============================

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      user: userId,
    }).populate(
      "items.product",
      "title price discountprice images"
    );

    // Cart doesn't exist
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// INCREASE QUANTITY
// ===============================

export const increaseQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;

    const userId = req.user.id;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    item.quantity += 1;

   await cart.save();

const updatedCart = await Cart.findById(cart._id).populate(
  "items.product",
  "title price discountprice images"
);

return res.status(200).json({
  success: true,
  message: "Quantity increased",
  data: updatedCart,
});
  } catch (error) {
    console.error("Increase quantity error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// DECREASE QUANTITY
// ===============================

export const decreaseQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;

    const userId = req.user.id;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Quantity 1 se neeche nahi jayegi
    if (item.quantity > 1) {
      item.quantity -= 1;
    }

    await cart.save();

const updatedCart = await Cart.findById(cart._id).populate(
  "items.product",
  "title price discountprice images"
);

return res.status(200).json({
  success: true,
  message: "Quantity decreased",
  data: updatedCart,
});

  } catch (error) {
    console.error("Decrease quantity error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// REMOVE FROM CART
// ===============================

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const userId = req.user.id;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Item remove
   item.deleteOne();

await cart.save();

const updatedCart = await Cart.findById(cart._id).populate(
  "items.product",
  "title price discountprice images"
);

return res.status(200).json({
  success: true,
  message: "Product removed from cart",
  data: updatedCart,
});

  } catch (error) {
    console.error("Remove from cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};