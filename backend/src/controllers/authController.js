import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js'

// REGISTER / SIGNUP

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 2. Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 3. Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      // role nahi bhej rahe
      // Model ka default role = "user"
    });

    // 6. Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// LOGIN

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Same message for security
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Generate Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    // 5. Generate Refresh Token
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // 6. Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Response
    return res.status(200).json({
      success: true,
      message: "Login successful",

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// REFRESH ACCESS TOKEN

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // 1. Check refresh token
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // 2. Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    );

    // 3. Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    // 5. Send new access token
    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please login again",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

// LOGOUT

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments({
      role: 'user'
    });

    return res.status(200).json({
      success: true,
      count
    });

  } catch (error) {
    console.error('Error fetching user count:', error);

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      { role: 'user' },
      { password: 0 }
    ).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// EXPORT

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};