import express from "express";

import {
  createOrder,
  getAllOrders,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// USER → CREATE ORDER

router.post(
  "/",
  authMiddleware,
  createOrder
);


// ADMIN → GET ALL ORDERS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);


export default router;