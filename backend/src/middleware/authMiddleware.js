import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Authorization header se token nikalo
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    // "Bearer TOKEN" me se actual TOKEN nikalega
    const token = authHeader.split(" ")[1];

    // Token verify karo
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET_KEY
    );

    // User ki information request me attach karo
    req.user = decoded;

    // Next middleware/controller par jao
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
};

export default authMiddleware;