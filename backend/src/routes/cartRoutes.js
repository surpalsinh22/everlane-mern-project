import express from "express";

import {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Add product
router.post(
  "/add",
  authMiddleware,
  addToCart
);


// Get cart
router.get(
  "/",
  authMiddleware,
  getCart
);


// Increase quantity
router.put(
  "/increase/:itemId",
  authMiddleware,
  increaseQuantity
);


// Decrease quantity
router.put(
  "/decrease/:itemId",
  authMiddleware,
  decreaseQuantity
);


// Remove item
router.delete(
  "/remove/:itemId",
  authMiddleware,
  removeFromCart
);


export default router;