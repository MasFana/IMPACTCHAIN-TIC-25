const mongoose = require("mongoose")

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    type: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "special", "achievement"],
    },
    category: {
      type: String,
      required: true,
      enum: ["donation", "social", "learning", "engagement", "referral"],
    },
    points: {
      type: Number,
      required: true,
      min: 1,
    },
    requirements: [
      {
        type: {
          type: String,
          required: true,
          enum: [
            "donate_amount",
            "donate_count",
            "invite_friends",
            "complete_profile",
            "share_program",
            "read_articles",
            "login_streak",
          ],
        },
        value: {
          type: Number,
          required: true,
        },
        description: String,
      },
    ],
    rewards: [
      {
        type: {
          type: String,
          enum: ["points", "badge", "token", "discount"],
        },
        value: mongoose.Schema.Types.Mixed,
        description: String,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    maxCompletions: {
      type: Number,
      default: null, // null means unlimited
    },
    currentCompletions: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon: String,
    badge: {
      name: String,
      image: String,
      description: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// User Mission Progress Schema
const userMissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed", "expired"],
      default: "not_started",
    },
    progress: [
      {
        requirementIndex: Number,
        currentValue: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: Date,
      },
    ],
    startedAt: Date,
    completedAt: Date,
    pointsEarned: {
      type: Number,
      default: 0,
    },
    rewardsReceived: [
      {
        type: String,
        value: mongoose.Schema.Types.Mixed,
        receivedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Check if mission is available for user
missionSchema.methods.isAvailableForUser = function (userId) {
  const now = new Date()
  return (
    this.isActive &&
    this.startDate <= now &&
    this.endDate >= now &&
    (this.maxCompletions === null || this.currentCompletions < this.maxCompletions)
  )
}

// Get mission progress for user
userMissionSchema.methods.getProgressPercentage = function () {
  if (this.progress.length === 0) return 0

  const completedRequirements = this.progress.filter((p) => p.completed).length
  return (completedRequirements / this.progress.length) * 100
}

// Update progress for specific requirement
userMissionSchema.methods.updateProgress = function (requirementIndex, value) {
  if (!this.progress[requirementIndex]) {
    this.progress[requirementIndex] = {
      requirementIndex,
      currentValue: 0,
      completed: false,
    }
  }

  const progress = this.progress[requirementIndex]
  progress.currentValue = Math.max(progress.currentValue, value)

  // Get the mission requirement
  return this.populate("mission").then(() => {
    const requirement = this.mission.requirements[requirementIndex]
    if (requirement && progress.currentValue >= requirement.value) {
      progress.completed = true
      progress.completedAt = new Date()
    }

    // Check if all requirements are completed
    const allCompleted = this.progress.every((p) => p.completed)
    if (allCompleted && this.status !== "completed") {
      this.status = "completed"
      this.completedAt = new Date()
      this.pointsEarned = this.mission.points
    }

    return this.save()
  })
}

// Indexes
missionSchema.index({ type: 1, isActive: 1, startDate: 1, endDate: 1 })
missionSchema.index({ category: 1, difficulty: 1 })
userMissionSchema.index({ user: 1, mission: 1 }, { unique: true })
userMissionSchema.index({ user: 1, status: 1 })

const Mission = mongoose.model("Mission", missionSchema)
const UserMission = mongoose.model("UserMission", userMissionSchema)

module.exports = { Mission, UserMission }
