import Cart from "../models/cartModel.js";
import Order from "../models/Ordermodel.js";


// ===============================
// CREATE ORDER
// ===============================

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // User ka cart find karo
    const cart = await Cart.findOne({
      user: userId,
    }).populate(
      "items.product",
      "title price discountprice images"
    );

    // Cart nahi hai
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Order items
    const orderItems = cart.items
      .filter((item) => item.product)
      .map((item) => {
        const price =
          Number(item.product.discountprice) ||
          Number(item.product.price);

        return {
          product: item.product._id,
          title: item.product.title,
          price: price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        };
      });

    // Total calculate
    const totalAmount = orderItems.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // Order create
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
    });

    // Order create hone ke baad cart empty
    cart.items = [];

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// GET ALL ORDERS - ADMIN
// ===============================

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};