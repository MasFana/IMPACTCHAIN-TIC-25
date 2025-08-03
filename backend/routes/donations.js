const express = require("express")
const { body, validationResult, query } = require("express-validator")
const Donation = require("../models/Donation")
const Program = require("../models/Program")
const User = require("../models/User")
const auth = require("../middleware/auth")
const mongoose = require("mongoose") // Declare mongoose variable
const { processPayment } = require("../services/paymentService")
const { recordDonationOnBlockchain } = require("../services/blockchainService")
const { sendEmail } = require("../utils/email")

const router = express.Router()

// Create Donation
router.post(
  "/",
  auth,
  [
    body("programId").isMongoId().withMessage("Valid program ID is required"),
    body("amount").isNumeric().isFloat({ min: 1000 }).withMessage("Amount must be at least 1000 IDR"),
    body("paymentMethod")
      .isIn(["credit_card", "bank_transfer", "e_wallet", "crypto"])
      .withMessage("Invalid payment method"),
    body("message").optional().isLength({ max: 500 }).withMessage("Message must be less than 500 characters"),
    body("isAnonymous").optional().isBoolean(),
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

      const { programId, amount, paymentMethod, message, isAnonymous, paymentDetails } = req.body
      const userId = req.user.userId

      // Check if program exists and is active
      const program = await Program.findById(programId)
      if (!program) {
        return res.status(404).json({
          success: false,
          message: "Program not found",
        })
      }

      if (!program.isActive) {
        return res.status(400).json({
          success: false,
          message: "Program is not active for donations",
        })
      }

      // Check minimum donation amount
      if (amount < program.settings.minimumDonation) {
        return res.status(400).json({
          success: false,
          message: `Minimum donation amount is ${program.settings.minimumDonation} IDR`,
        })
      }

      // Create donation record
      const donation = new Donation({
        donor: userId,
        program: programId,
        amount,
        paymentMethod,
        message,
        isAnonymous: isAnonymous || false,
        paymentDetails: paymentDetails || {},
        metadata: {
          userAgent: req.get("User-Agent"),
          ipAddress: req.ip,
        },
      })

      await donation.save()

      // Process payment
      try {
        const paymentResult = await processPayment({
          amount,
          currency: "IDR",
          paymentMethod,
          paymentDetails,
          donationId: donation._id,
          userId,
        })

        // Update donation with payment details
        donation.paymentDetails = {
          ...donation.paymentDetails,
          ...paymentResult,
        }
        donation.status = paymentResult.status || "processing"
        await donation.save()

        // If payment successful, update program and user
        if (paymentResult.status === "completed") {
          await handleSuccessfulDonation(donation, program, userId)
        }

        res.status(201).json({
          success: true,
          message: "Donation created successfully",
          data: {
            donation: donation.toJSON(),
            paymentResult,
          },
        })
      } catch (paymentError) {
        console.error("Payment processing error:", paymentError)

        // Update donation status to failed
        donation.status = "failed"
        await donation.save()

        res.status(400).json({
          success: false,
          message: "Payment processing failed",
          error: paymentError.message,
        })
      }
    } catch (error) {
      console.error("Create donation error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to create donation",
        error: error.message,
      })
    }
  },
)

// Handle successful donation
async function handleSuccessfulDonation(donation, program, userId) {
  try {
    // Update program
    await program.addDonation(donation.amount)

    // Update user stats and points
    const user = await User.findById(userId)
    if (user) {
      user.totalDonations += donation.amount

      // Award points (1 point per 1000 IDR)
      const pointsEarned = Math.floor(donation.amount / 1000) // Declare pointsEarned variable
      user.addPoints(pointsEarned)

      // Check for badges
      await checkAndAwardBadges(user)

      await user.save()
    }

    // Record on blockchain
    try {
      const blockchainResult = await recordDonationOnBlockchain({
        donationId: donation._id,
        donor: userId,
        program: program._id,
        amount: donation.amount,
      })

      donation.blockchain = blockchainResult
      await donation.save()
    } catch (blockchainError) {
      console.error("Blockchain recording error:", blockchainError)
      // Don't fail the donation if blockchain recording fails
    }

    // Send confirmation email
    try {
      await sendEmail({
        to: user.email,
        subject: "Donation Confirmation - ImpactChain",
        template: "donation-receipt",
        data: {
          donorName: user.name,
          programTitle: program.title,
          amount: donation.amount,
          receiptNumber: donation.receipt.receiptNumber,
          donationDate: donation.createdAt,
          pointsEarned: pointsEarned, // Use declared pointsEarned variable
        },
      })
    } catch (emailError) {
      console.error("Failed to send donation confirmation email:", emailError)
    }
  } catch (error) {
    console.error("Error handling successful donation:", error)
    throw error
  }
}

// Check and award badges
async function checkAndAwardBadges(user) {
  const badges = []

  // First donation badge
  if (user.totalDonations >= 10000 && !user.badges.some((b) => b.name === "first_donor")) {
    badges.push({ name: "first_donor", earnedAt: new Date() })
  }

  // Generous donor badge (100k total)
  if (user.totalDonations >= 100000 && !user.badges.some((b) => b.name === "generous_donor")) {
    badges.push({ name: "generous_donor", earnedAt: new Date() })
  }

  // Super donor badge (1M total)
  if (user.totalDonations >= 1000000 && !user.badges.some((b) => b.name === "super_donor")) {
    badges.push({ name: "super_donor", earnedAt: new Date() })
  }

  if (badges.length > 0) {
    user.badges.push(...badges)
  }
}

// Get User Donations
router.get(
  "/my-donations",
  auth,
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1-100"),
    query("status").optional().isIn(["pending", "processing", "completed", "failed", "refunded"]),
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

      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit
      const { status } = req.query

      const filter = { donor: req.user.userId }
      if (status) {
        filter.status = status
      }

      const donations = await Donation.find(filter)
        .populate("program", "title category targetAmount currentAmount")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      const total = await Donation.countDocuments(filter)

      res.json({
        success: true,
        data: {
          donations,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      })
    } catch (error) {
      console.error("Get user donations error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to get donations",
        error: error.message,
      })
    }
  },
)

// Get Donation by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name email")
      .populate("program", "title description category organizer")

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      })
    }

    // Check if user owns this donation or is admin
    const user = await User.findById(req.user.userId)
    if (donation.donor._id.toString() !== req.user.userId && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      })
    }

    res.json({
      success: true,
      data: {
        donation,
      },
    })
  } catch (error) {
    console.error("Get donation error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get donation",
      error: error.message,
    })
  }
})

// Get Program Donations (for program organizers)
router.get(
  "/program/:programId",
  auth,
  [query("page").optional().isInt({ min: 1 }), query("limit").optional().isInt({ min: 1, max: 100 })],
  async (req, res) => {
    try {
      const { programId } = req.params
      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit

      // Check if user is program organizer or admin
      const program = await Program.findById(programId)
      if (!program) {
        return res.status(404).json({
          success: false,
          message: "Program not found",
        })
      }

      const user = await User.findById(req.user.userId)
      if (program.organizer.toString() !== req.user.userId && user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        })
      }

      const donations = await Donation.find({
        program: programId,
        status: "completed",
      })
        .populate("donor", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      const total = await Donation.countDocuments({
        program: programId,
        status: "completed",
      })

      // Calculate statistics
      const stats = await Donation.aggregate([
        { $match: { program: mongoose.Types.ObjectId(programId), status: "completed" } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            totalDonations: { $sum: 1 },
            averageDonation: { $avg: "$amount" },
          },
        },
      ])

      res.json({
        success: true,
        data: {
          donations,
          statistics: stats[0] || { totalAmount: 0, totalDonations: 0, averageDonation: 0 },
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      })
    } catch (error) {
      console.error("Get program donations error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to get program donations",
        error: error.message,
      })
    }
  },
)

// Webhook for payment status updates
router.post("/webhook/payment-status", async (req, res) => {
  try {
    // Verify webhook signature (implementation depends on payment provider)
    const { donationId, status, transactionId, txHash } = req.body

    const donation = await Donation.findById(donationId)
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      })
    }

    // Update donation status
    donation.status = status
    if (transactionId) {
      donation.paymentDetails.transactionId = transactionId
    }
    if (txHash) {
      donation.blockchain.txHash = txHash
      donation.blockchain.confirmed = true
    }

    await donation.save()

    // If payment completed, handle success
    if (status === "completed" && donation.status !== "completed") {
      const program = await Program.findById(donation.program)
      await handleSuccessfulDonation(donation, program, donation.donor)
    }

    res.json({
      success: true,
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("Payment webhook error:", error)
    res.status(500).json({
      success: false,
      message: "Webhook processing failed",
      error: error.message,
    })
  }
})

module.exports = router
