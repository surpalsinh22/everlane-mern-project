const adminMiddleware = (req, res, next) => {
  try {
    // authMiddleware ke baad req.user available hoga
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check karo user admin hai ya nahi
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only",
      });
    }

    // Admin hai → next middleware/controller
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default adminMiddleware;