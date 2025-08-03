const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    totalDonations: {
      type: Number,
      default: 0,
    },
    missionsCompleted: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        name: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    preferences: {
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
      },
      privacy: {
        showInLeaderboard: {
          type: Boolean,
          default: true,
        },
        profileVisibility: {
          type: String,
          enum: ["public", "private"],
          default: "public",
        },
      },
    },
    walletAddress: {
      type: String,
      trim: true,
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Calculate level based on points
userSchema.methods.calculateLevel = function () {
  this.level = Math.floor(this.points / 1000) + 1
  return this.level
}

// Add points and update level
userSchema.methods.addPoints = function (points) {
  this.points += points
  this.calculateLevel()
  return this.points
}

// Get user stats
userSchema.methods.getStats = function () {
  return {
    totalDonations: this.totalDonations,
    missionsCompleted: this.missionsCompleted,
    points: this.points,
    level: this.level,
    badges: this.badges.length,
  }
}

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.emailVerificationToken
  delete user.passwordResetToken
  delete user.passwordResetExpires
  return user
}

module.exports = mongoose.model("User", userSchema)
