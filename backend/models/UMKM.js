const mongoose = require("mongoose")

const umkmSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "food_beverage",
        "retail",
        "services",
        "manufacturing",
        "agriculture",
        "technology",
        "creative",
        "tourism",
        "other",
      ],
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    businessPlan: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      postalCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: String,
      website: String,
      socialMedia: {
        instagram: String,
        facebook: String,
        tiktok: String,
      },
    },
    financial: {
      requestedAmount: {
        type: Number,
        required: true,
        min: 1000000, // Minimum 1 million IDR
      },
      currentRevenue: Number,
      projectedRevenue: Number,
      employeeCount: {
        type: Number,
        default: 1,
      },
      businessAge: Number, // in months
      bankAccount: {
        bankName: String,
        accountNumber: String,
        accountHolder: String,
      },
    },
    documents: [
      {
        type: {
          type: String,
          enum: ["ktp", "business_license", "financial_statement", "business_plan", "other"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        filename: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    images: [
      {
        url: String,
        caption: String,
        type: {
          type: String,
          enum: ["product", "business", "owner", "other"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "submitted", "under_review", "approved", "rejected", "funded"],
      default: "draft",
    },
    reviewNotes: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: Date,
    approvedAt: Date,
    rejectedAt: Date,
    funding: {
      targetAmount: Number,
      raisedAmount: {
        type: Number,
        default: 0,
      },
      donorCount: {
        type: Number,
        default: 0,
      },
      fundingDeadline: Date,
      disbursedAmount: {
        type: Number,
        default: 0,
      },
      disbursements: [
        {
          amount: Number,
          disbursedAt: Date,
          txHash: String,
          notes: String,
        },
      ],
    },
    milestones: [
      {
        title: String,
        description: String,
        targetDate: Date,
        status: {
          type: String,
          enum: ["pending", "in_progress", "completed", "delayed"],
          default: "pending",
        },
        completedAt: Date,
        evidence: [
          {
            type: String,
            url: String,
            description: String,
          },
        ],
      },
    ],
    reports: [
      {
        period: String, // e.g., "2024-Q1"
        revenue: Number,
        expenses: Number,
        profit: Number,
        employeeCount: Number,
        achievements: String,
        challenges: String,
        nextPeriodPlan: String,
        submittedAt: {
          type: Date,
          default: Date.now,
        },
        evidence: [
          {
            type: String,
            url: String,
            description: String,
          },
        ],
      },
    ],
    blockchain: {
      contractAddress: String,
      txHash: String,
      blockNumber: Number,
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    featuredUntil: Date,
    statistics: {
      views: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
      supporters: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for funding progress
umkmSchema.virtual("fundingProgress").get(function () {
  if (!this.funding.targetAmount) return 0
  return Math.min((this.funding.raisedAmount / this.funding.targetAmount) * 100, 100)
})

// Virtual for days remaining
umkmSchema.virtual("daysRemaining").get(function () {
  if (!this.funding.fundingDeadline) return null
  const now = new Date()
  const deadline = new Date(this.funding.fundingDeadline)
  const diffTime = deadline - now
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Method to add funding
umkmSchema.methods.addFunding = function (amount, donorId) {
  this.funding.raisedAmount += amount
  this.funding.donorCount += 1

  // Check if funding target reached
  if (this.funding.raisedAmount >= this.funding.targetAmount && this.status === "approved") {
    this.status = "funded"
  }

  return this.save()
}

// Method to submit for review
umkmSchema.methods.submitForReview = function () {
  if (this.status === "draft") {
    this.status = "submitted"
    return this.save()
  }
  throw new Error("UMKM can only be submitted from draft status")
}

// Method to approve
umkmSchema.methods.approve = function (reviewerId, notes) {
  this.status = "approved"
  this.reviewedBy = reviewerId
  this.reviewedAt = new Date()
  this.approvedAt = new Date()
  this.reviewNotes = notes

  // Set funding details
  this.funding.targetAmount = this.financial.requestedAmount
  this.funding.fundingDeadline = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now

  return this.save()
}

// Method to reject
umkmSchema.methods.reject = function (reviewerId, notes) {
  this.status = "rejected"
  this.reviewedBy = reviewerId
  this.reviewedAt = new Date()
  this.rejectedAt = new Date()
  this.reviewNotes = notes

  return this.save()
}

// Get UMKM summary
umkmSchema.methods.getSummary = function () {
  return {
    id: this._id,
    businessName: this.businessName,
    category: this.category,
    description: this.description,
    location: `${this.location.city}, ${this.location.province}`,
    requestedAmount: this.financial.requestedAmount,
    status: this.status,
    fundingProgress: this.fundingProgress,
    daysRemaining: this.daysRemaining,
    employeeCount: this.financial.employeeCount,
    primaryImage: this.images.find((img) => img.type === "business")?.url || this.images[0]?.url,
  }
}

// Indexes
umkmSchema.index({ owner: 1 })
umkmSchema.index({ status: 1, createdAt: -1 })
umkmSchema.index({ category: 1, status: 1 })
umkmSchema.index({ "location.province": 1, "location.city": 1 })
umkmSchema.index({ featured: 1, featuredUntil: 1 })

module.exports = mongoose.model("UMKM", umkmSchema)
