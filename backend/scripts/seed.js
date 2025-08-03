const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/User")
const Program = require("../models/Program")
const { Mission } = require("../models/Mission")
const UMKM = require("../models/UMKM")

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Program.deleteMany({})
    await Mission.deleteMany({})
    await UMKM.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminUser = new User({
      name: "Admin ImpactChain",
      email: "admin@impactchain.com",
      password: "admin123456",
      role: "admin",
      emailVerified: true,
      isActive: true,
      points: 10000,
      level: 10,
    })
    await adminUser.save()
    console.log("Admin user created")

    // Create sample users
    const users = []
    const userNames = [
      "Ahmad Santoso",
      "Siti Rahayu",
      "Budi Pratama",
      "Linda Maharani",
      "Rizki Hakim",
      "Dewi Permata",
      "Andi Wijaya",
      "Maya Sari",
    ]

    for (let i = 0; i < userNames.length; i++) {
      const user = new User({
        name: userNames[i],
        email: `user${i + 1}@example.com`,
        password: "password123",
        phone: `+62812345678${i}`,
        location: i % 2 === 0 ? "Jakarta, Indonesia" : "Bandung, Indonesia",
        emailVerified: true,
        isActive: true,
        points: Math.floor(Math.random() * 5000) + 1000,
        totalDonations: Math.floor(Math.random() * 1000000) + 100000,
        missionsCompleted: Math.floor(Math.random() * 50) + 10,
      })
      user.level = Math.floor(user.points / 1000) + 1
      await user.save()
      users.push(user)
    }
    console.log("Sample users created")

    // Create sample programs
    const programs = [
      {
        title: "Pendidikan Anak Kurang Mampu",
        description:
          "Program bantuan pendidikan untuk anak-anak dari keluarga kurang mampu di daerah terpencil Indonesia.",
        category: "education",
        targetAmount: 50000000,
        currentAmount: 35000000,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        organizer: users[0]._id,
        status: "active",
        location: {
          province: "Jawa Barat",
          city: "Bandung",
          address: "Jl. Pendidikan No. 123",
        },
        urgency: "high",
        isVerified: true,
        verifiedBy: adminUser._id,
        verifiedAt: new Date(),
      },
      {
        title: "Bantuan Kesehatan Masyarakat",
        description: "Penyediaan layanan kesehatan gratis dan obat-obatan untuk masyarakat desa.",
        category: "health",
        targetAmount: 75000000,
        currentAmount: 45000000,
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-11-30"),
        organizer: users[1]._id,
        status: "active",
        location: {
          province: "Jawa Tengah",
          city: "Solo",
          address: "Jl. Kesehatan No. 456",
        },
        urgency: "critical",
        isVerified: true,
        verifiedBy: adminUser._id,
        verifiedAt: new Date(),
      },
      {
        title: "Pelestarian Lingkungan",
        description: "Program penanaman pohon dan pembersihan sungai untuk menjaga kelestarian lingkungan.",
        category: "environment",
        targetAmount: 30000000,
        currentAmount: 18000000,
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-09-30"),
        organizer: users[2]._id,
        status: "active",
        location: {
          province: "Jawa Timur",
          city: "Surabaya",
          address: "Jl. Lingkungan No. 789",
        },
        urgency: "medium",
        isVerified: true,
        verifiedBy: adminUser._id,
        verifiedAt: new Date(),
      },
    ]

    for (const programData of programs) {
      const program = new Program(programData)
      await program.save()
    }
    console.log("Sample programs created")

    // Create sample missions
    const missions = [
      {
        title: "Donasi Pertama",
        description: "Lakukan donasi pertama Anda minimal Rp 10,000",
        type: "daily",
        category: "donation",
        points: 100,
        requirements: [
          {
            type: "donate_amount",
            value: 10000,
            description: "Donasi minimal Rp 10,000",
          },
        ],
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        difficulty: "easy",
        createdBy: adminUser._id,
      },
      {
        title: "Ajak Teman Bergabung",
        description: "Undang 3 teman untuk bergabung dengan ImpactChain",
        type: "weekly",
        category: "social",
        points: 300,
        requirements: [
          {
            type: "invite_friends",
            value: 3,
            description: "Undang 3 teman",
          },
        ],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        difficulty: "medium",
        createdBy: adminUser._id,
      },
      {
        title: "Lengkapi Profil",
        description: "Lengkapi profil Anda dengan foto dan informasi personal",
        type: "daily",
        category: "learning",
        points: 50,
        requirements: [
          {
            type: "complete_profile",
            value: 100,
            description: "Lengkapi profil 100%",
          },
        ],
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        difficulty: "easy",
        createdBy: adminUser._id,
      },
    ]

    for (const missionData of missions) {
      const mission = new Mission(missionData)
      await mission.save()
    }
    console.log("Sample missions created")

    // Create sample UMKM
    const umkmList = [
      {
        businessName: "Warung Kopi Nusantara",
        owner: users[3]._id,
        category: "food_beverage",
        description:
          "Warung kopi tradisional yang menyajikan kopi lokal berkualitas tinggi dengan suasana yang nyaman.",
        businessPlan: "Mengembangkan warung kopi dengan menambah variasi menu dan memperluas area tempat duduk.",
        location: {
          address: "Jl. Kopi No. 123",
          city: "Yogyakarta",
          province: "DIY",
          postalCode: "55281",
        },
        contact: {
          phone: "+62812345671",
          email: "warungkopi@example.com",
        },
        financial: {
          requestedAmount: 15000000,
          currentRevenue: 8000000,
          projectedRevenue: 15000000,
          employeeCount: 4,
          businessAge: 24,
        },
        status: "approved",
        approvedAt: new Date(),
        reviewedBy: adminUser._id,
        funding: {
          targetAmount: 15000000,
          raisedAmount: 8500000,
          donorCount: 23,
          fundingDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      },
      {
        businessName: "Kerajinan Bambu Lestari",
        owner: users[4]._id,
        category: "creative",
        description: "Usaha kerajinan bambu ramah lingkungan dengan produk berkualitas tinggi.",
        businessPlan: "Mengembangkan produk kerajinan bambu untuk pasar ekspor dan meningkatkan kapasitas produksi.",
        location: {
          address: "Jl. Bambu No. 456",
          city: "Bandung",
          province: "Jawa Barat",
          postalCode: "40123",
        },
        contact: {
          phone: "+62812345672",
          email: "bambulestari@example.com",
        },
        financial: {
          requestedAmount: 25000000,
          currentRevenue: 12000000,
          projectedRevenue: 25000000,
          employeeCount: 8,
          businessAge: 36,
        },
        status: "under_review",
        reviewedBy: adminUser._id,
        funding: {
          targetAmount: 25000000,
          raisedAmount: 0,
          donorCount: 0,
          fundingDeadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        },
      },
    ]

    for (const umkmData of umkmList) {
      const umkm = new UMKM(umkmData)
      await umkm.save()
    }
    console.log("Sample UMKM created")

    console.log("Database seeded successfully!")
    console.log("\nLogin credentials:")
    console.log("Admin: admin@impactchain.com / admin123456")
    console.log("User: user1@example.com / password123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

// Run the seed function
seedDatabase()
