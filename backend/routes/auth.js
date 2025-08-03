const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const { sendEmail } = require("../utils/email")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Register
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2-100 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("phone").optional().isMobilePhone("id-ID").withMessage("Please provide a valid Indonesian phone number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { name, email, password, phone, location } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        })
      }

      // Generate email verification token
      const emailVerificationToken = crypto.randomBytes(32).toString("hex")

      // Create user
      const user = new User({
        name,
        email,
        password,
        phone,
        location,
        emailVerificationToken,
      })

      await user.save()

      // Send verification email
      try {
        await sendEmail({
          to: email,
          subject: "Verify Your Email - ImpactChain",
          template: "welcome",
          data: {
            name,
            verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`,
          },
        })
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

      res.status(201).json({
        success: true,
        message: "User registered successfully. Please check your email for verification.",
        data: {
          user: user.toJSON(),
          token,
        },
      })
    } catch (error) {
      console.error("Registration error:", error)
      res.status(500).json({
        success: false,
        message: "Registration failed",
        error: error.message,
      })
    }
  },
)

// Login
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      // Find user
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account has been deactivated. Please contact support.",
        })
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Update last login
      user.lastLogin = new Date()
      await user.save()

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user: user.toJSON(),
          token,
        },
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Login failed",
        error: error.message,
      })
    }
  },
)

// Verify Email
router.post(
  "/verify-email",
  [body("token").notEmpty().withMessage("Verification token is required")],
  async (req, res) => {
    try {
      const { token } = req.body

      const user = await User.findOne({ emailVerificationToken: token })
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired verification token",
        })
      }

      user.emailVerified = true
      user.emailVerificationToken = undefined
      user.points += 50 // Bonus points for email verification
      user.calculateLevel()
      await user.save()

      res.json({
        success: true,
        message: "Email verified successfully! You earned 50 bonus points.",
        data: {
          user: user.toJSON(),
        },
      })
    } catch (error) {
      console.error("Email verification error:", error)
      res.status(500).json({
        success: false,
        message: "Email verification failed",
        error: error.message,
      })
    }
  },
)

// Forgot Password
router.post(
  "/forgot-password",
  [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email")],
  async (req, res) => {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        // Don't reveal if email exists or not
        return res.json({
          success: true,
          message: "If an account with that email exists, we have sent a password reset link.",
        })
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex")
      user.passwordResetToken = resetToken
      user.passwordResetExpires = Date.now() + 3600000 // 1 hour
      await user.save()

      // Send reset email
      try {
        await sendEmail({
          to: email,
          subject: "Password Reset - ImpactChain",
          template: "password-reset",
          data: {
            name: user.name,
            resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
          },
        })
      } catch (emailError) {
        console.error("Failed to send reset email:", emailError)
      }

      res.json({
        success: true,
        message: "If an account with that email exists, we have sent a password reset link.",
      })
    } catch (error) {
      console.error("Forgot password error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to process password reset request",
        error: error.message,
      })
    }
  },
)

// Reset Password
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const { token, password } = req.body

      const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
      })

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        })
      }

      user.password = password
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()

      res.json({
        success: true,
        message: "Password reset successfully",
      })
    } catch (error) {
      console.error("Reset password error:", error)
      res.status(500).json({
        success: false,
        message: "Password reset failed",
        error: error.message,
      })
    }
  },
)

// Get Current User
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      data: {
        user: user.toJSON(),
      },
    })
  } catch (error) {
    console.error("Get current user error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get user information",
      error: error.message,
    })
  }
})

// Refresh Token
router.post("/refresh-token", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive",
      })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({
      success: true,
      data: {
        token,
      },
    })
  } catch (error) {
    console.error("Refresh token error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to refresh token",
      error: error.message,
    })
  }
})

// Logout (client-side token removal, but we can track it)
router.post("/logout", auth, async (req, res) => {
  try {
    // You could implement token blacklisting here if needed
    res.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    })
  }
})

module.exports = router
