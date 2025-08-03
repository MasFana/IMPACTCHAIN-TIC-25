const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/impactchain", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const donationRoutes = require("./routes/donations")
const missionRoutes = require("./routes/missions")
const umkmRoutes = require("./routes/umkm")
const blockchainRoutes = require("./routes/blockchain")
const adminRoutes = require("./routes/admin")

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/missions", missionRoutes)
app.use("/api/umkm", umkmRoutes)
app.use("/api/blockchain", blockchainRoutes)
app.use("/api/admin", adminRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
