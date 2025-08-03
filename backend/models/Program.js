const mongoose = require("mongoose")

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    shortDescription: {
      type: String,
      maxlength: 300,
    },
    category: {
      type: String,
      required: true,
      enum: ["education", "health", "environment", "disaster_relief", "poverty", "community", "other"],
    },
    images: [
      {
        url: String,
        caption: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    targetAmount: {
      type: Number,
      required: true,
      min: 100000, // Minimum target 100k IDR
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    donorCount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      name: String,
      website: String,
      phone: String,
      email: String,
      address: String,
    },
    location: {
      province: String,
      city: String,
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    status: {
      type: String,
      enum: ["draft", "pending_review", "active", "paused", "completed", "cancelled"],
      default: "draft",
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    tags: [String],
    beneficiaries: {
      count: Number,
      description: String,
      demographics: {
        children: Number,
        adults: Number,
        elderly: Number,
        families: Number,
      },
    },
    milestones: [
      {
        title: String,
        description: String,
        targetAmount: Number,
        targetDate: Date,
        status: {
          type: String,
          enum: ["pending", "in_progress", "completed"],
          default: "pending",
        },
        completedAt: Date,
      },
    ],
    updates: [
      {
        title: String,
        content: String,
        images: [String],
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        postedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      verifiedAt: Date,
      documents: [
        {
          type: String,
          url: String,
          uploadedAt: Date,
        },
      ],
    },
    blockchain: {
      contractAddress: String,
      txHash: String,
      blockNumber: Number,
    },
    settings: {
      allowAnonymousDonations: {
        type: Boolean,
        default: true,
      },
      minimumDonation: {
        type: Number,
        default: 10000,
      },
      autoWithdraw: {
        type: Boolean,
        default: false,
      },
      withdrawalThreshold: Number,
    },
    statistics: {
      views: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
      averageDonation: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Calculate progress percentage
programSchema.virtual("progressPercentage").get(function () {
  return Math.min((this.currentAmount / this.targetAmount) * 100, 100)
})

// Check if program is active
programSchema.virtual("isActive").get(function () {
  const now = new Date()
  return (
    this.status === "active" && this.startDate <= now && this.endDate >= now && this.currentAmount < this.targetAmount
  )
})

// Update current amount and donor count
programSchema.methods.addDonation = function (amount) {
  this.currentAmount += amount
  this.donorCount += 1
  this.statistics.averageDonation = this.currentAmount / this.donorCount

  // Check if target reached
  if (this.currentAmount >= this.targetAmount && this.status === "active") {
    this.status = "completed"
  }

  return this.save()
}

// Get program summary
programSchema.methods.getSummary = function () {
  return {
    id: this._id,
    title: this.title,
    shortDescription: this.shortDescription,
    category: this.category,
    targetAmount: this.targetAmount,
    currentAmount: this.currentAmount,
    progressPercentage: this.progressPercentage,
    donorCount: this.donorCount,
    urgency: this.urgency,
    status: this.status,
    endDate: this.endDate,
    primaryImage: this.images.find((img) => img.isPrimary)?.url || this.images[0]?.url,
  }
}

// Indexes for better performance
programSchema.index({ status: 1, endDate: 1 })
programSchema.index({ category: 1, status: 1 })
programSchema.index({ organizer: 1 })
programSchema.index({ "location.province": 1, "location.city": 1 })
programSchema.index({ urgency: 1, status: 1 })

module.exports = mongoose.model("Program", programSchema)
