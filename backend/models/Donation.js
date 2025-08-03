const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1000, // Minimum donation 1000 IDR
    },
    currency: {
      type: String,
      default: "IDR",
      enum: ["IDR", "USD", "ETH", "BTC"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit_card", "bank_transfer", "e_wallet", "crypto"],
    },
    paymentDetails: {
      provider: String, // stripe, midtrans, etc
      transactionId: String,
      paymentIntentId: String,
      walletAddress: String,
      txHash: String, // for crypto payments
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    message: {
      type: String,
      maxlength: 500,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    receipt: {
      receiptNumber: {
        type: String,
        unique: true,
      },
      issuedAt: Date,
      downloadUrl: String,
    },
    blockchain: {
      txHash: String,
      blockNumber: Number,
      gasUsed: Number,
      confirmed: {
        type: Boolean,
        default: false,
      },
    },
    refund: {
      reason: String,
      refundedAt: Date,
      refundAmount: Number,
      refundTxHash: String,
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      location: {
        country: String,
        city: String,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Generate receipt number
donationSchema.pre("save", function (next) {
  if (!this.receipt.receiptNumber) {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const random = Math.random().toString(36).substr(2, 6).toUpperCase()

    this.receipt.receiptNumber = `ICT-${year}${month}${day}-${random}`
    this.receipt.issuedAt = date
  }
  next()
})

// Index for better query performance
donationSchema.index({ donor: 1, createdAt: -1 })
donationSchema.index({ program: 1, status: 1 })
donationSchema.index({ "receipt.receiptNumber": 1 })
donationSchema.index({ "blockchain.txHash": 1 })

module.exports = mongoose.model("Donation", donationSchema)
