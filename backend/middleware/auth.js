const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      })
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account has been deactivated.",
      })
    }

    req.user = { userId: user._id.toString(), role: user.role }
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      })
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      })
    }

    console.error("Auth middleware error:", error)
    res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    })
  }
}

// Admin authorization middleware
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {})

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      })
    }

    next()
  } catch (error) {
    console.error("Admin auth middleware error:", error)
    res.status(500).json({
      success: false,
      message: "Authorization failed.",
      error: error.message,
    })
  }
}

// Optional auth middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId)

      if (user && user.isActive) {
        req.user = { userId: user._id.toString(), role: user.role }
      }
    }

    next()
  } catch (error) {
    // Continue without authentication if token is invalid
    next()
  }
}

module.exports = { auth, adminAuth, optionalAuth }
