const adminMiddleware = (req, res, next) => {
  try {
    // Make sure authMiddleware has already attached the user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login."
      });
    }

    // Check if user role is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only."
      });
    }

    // Allow request to continue
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export default adminMiddleware;
