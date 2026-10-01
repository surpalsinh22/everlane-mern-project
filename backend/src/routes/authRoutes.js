import express from "express";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserCount,
  getUsers
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

router.get('/count', getUserCount);
router.get('/users', getUsers);

export default router;