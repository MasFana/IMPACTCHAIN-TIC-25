"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Heart,
  Trophy,
  Users,
  TrendingUp,
  Coins,
  Shield,
  Target,
  Award,
  Wallet,
  Building2,
  BookOpen,
  BarChart3,
  Star,
  User,
  Settings,
  CalendarIcon,
  MapPin,
  Phone,
  Mail,
  Edit,
  Camera,
  Bell,
  Lock,
  CreditCard,
  History,
  Share2,
  Download,
  Activity,
  DollarSign,
  Plus,
  Check,
  ExternalLink,
  Copy,
  RefreshCw,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
  Calendar,
  MapPinIcon,
  GraduationCap,
  Filter,
  Medal,
  Crown,
  Flame,
} from "lucide-react"

export default function SocialImpactPlatform() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false)
  const [isUMKMApplicationOpen, setIsUMKMApplicationOpen] = useState(false)
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false)
  const [selectedMission, setSelectedMission] = useState(null)
  const [selectedTraining, setSelectedTraining] = useState(null)
  const [leaderboardFilter, setLeaderboardFilter] = useState("donations")
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    bio: "Passionate about making positive social impact through technology and community engagement.",
  })
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    marketing: true,
  })
  const [donationHistory, setDonationHistory] = useState([
    { id: 1, program: "Program Pendidikan Anak", amount: 50000, date: "2024-12-15", status: "completed" },
    { id: 2, program: "Bantuan Kesehatan", amount: 75000, date: "2024-12-10", status: "completed" },
    { id: 3, program: "UMKM Warung Sari", amount: 100000, date: "2024-12-05", status: "completed" },
  ])
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Donasi Minimal Rp 10K",
      description: "Lakukan donasi minimal Rp 10,000 untuk program apapun",
      points: 50,
      type: "daily",
      status: "completed",
      progress: 100,
      deadline: "2024-12-18",
    },
    {
      id: 2,
      title: "Ajak 1 Teman Bergabung",
      description: "Undang minimal 1 teman untuk bergabung dengan platform",
      points: 100,
      type: "daily",
      status: "available",
      progress: 0,
      deadline: "2024-12-18",
    },
    {
      id: 3,
      title: "Baca Artikel Dampak",
      description: "Baca minimal 3 artikel tentang dampak sosial",
      points: 25,
      type: "daily",
      status: "available",
      progress: 0,
      deadline: "2024-12-18",
    },
    {
      id: 4,
      title: "Dukung 3 UMKM",
      description: "Berikan dukungan untuk 3 UMKM berbeda",
      points: 200,
      type: "weekly",
      status: "in_progress",
      progress: 66,
      deadline: "2024-12-22",
    },
    {
      id: 5,
      title: "Total Donasi Rp 100K",
      description: "Capai total donasi Rp 100,000 dalam seminggu",
      points: 300,
      type: "weekly",
      status: "available",
      progress: 0,
      deadline: "2024-12-22",
    },
  ])
  const [umkmData, setUmkmData] = useState([
    {
      id: 1,
      name: "Warung Sari",
      category: "Kuliner",
      owner: "Sari Dewi",
      location: "Bandung, Jawa Barat",
      description: "Warung makan tradisional dengan menu khas Sunda",
      grantReceived: 2500000,
      monthlyRevenue: 8500000,
      revenueGrowth: 45,
      employeeCount: 3,
      status: "active",
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Toko Maju",
      category: "Retail",
      owner: "Budi Santoso",
      location: "Surabaya, Jawa Timur",
      description: "Toko kelontong dengan fokus produk lokal",
      grantReceived: 1800000,
      monthlyRevenue: 6200000,
      revenueGrowth: 32,
      employeeCount: 2,
      status: "active",
      joinDate: "2024-02-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Kerajinan Indah",
      category: "Kerajinan",
      owner: "Indah Permata",
      location: "Yogyakarta, DIY",
      description: "Kerajinan tangan dari bahan daur ulang",
      grantReceived: 3200000,
      monthlyRevenue: 12000000,
      revenueGrowth: 67,
      employeeCount: 5,
      status: "active",
      joinDate: "2024-03-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: "Digital Marketing untuk UMKM",
      description: "Pelajari strategi pemasaran digital untuk meningkatkan penjualan online",
      instructor: "Dr. Marketing Expert",
      duration: "4 minggu",
      participants: 24,
      maxParticipants: 30,
      startDate: "2024-12-20",
      price: 0,
      level: "Pemula",
      category: "Marketing",
      status: "open",
    },
    {
      id: 2,
      title: "Manajemen Keuangan Usaha",
      description: "Kelola keuangan usaha dengan lebih efektif dan profesional",
      instructor: "Prof. Finance Guru",
      duration: "3 minggu",
      participants: 18,
      maxParticipants: 25,
      startDate: "2024-12-25",
      price: 0,
      level: "Menengah",
      category: "Finance",
      status: "open",
    },
    {
      id: 3,
      title: "Strategi Pengembangan Produk",
      description: "Kembangkan produk yang sesuai dengan kebutuhan pasar",
      instructor: "Startup Mentor",
      duration: "5 minggu",
      participants: 12,
      maxParticipants: 20,
      startDate: "2025-01-05",
      price: 0,
      level: "Lanjutan",
      category: "Product",
      status: "open",
    },
  ])
  const [leaderboardData, setLeaderboardData] = useState({
    donations: [
      {
        id: 1,
        name: "Ahmad Santoso",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 850000,
        rank: 1,
        points: 4250,
        badge: "gold",
      },
      {
        id: 2,
        name: "Siti Rahayu",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 720000,
        rank: 2,
        points: 3890,
        badge: "silver",
      },
      {
        id: 3,
        name: "Budi Pratama",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 650000,
        rank: 3,
        points: 3420,
        badge: "bronze",
      },
      {
        id: 4,
        name: "Linda Maharani",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 580000,
        rank: 4,
        points: 3100,
        badge: "none",
      },
      {
        id: 5,
        name: "Rizki Hakim",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 450000,
        rank: 5,
        points: 2800,
        badge: "none",
      },
      {
        id: 6,
        name: "Dewi Permata",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 380000,
        rank: 6,
        points: 2600,
        badge: "none",
      },
      {
        id: 7,
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        amount: 320000,
        rank: 7,
        points: 2450,
        badge: "none",
      },
    ],
    missions: [
      {
        id: 1,
        name: "Dewi Permata",
        avatar: "/placeholder.svg?height=32&width=32",
        missionsCompleted: 156,
        rank: 1,
        level: 12,
        badge: "gold",
      },
      {
        id: 2,
        name: "Rizki Hakim",
        avatar: "/placeholder.svg?height=32&width=32",
        missionsCompleted: 142,
        rank: 2,
        level: 11,
        badge: "silver",
      },
      {
        id: 3,
        name: "Linda Maharani",
        avatar: "/placeholder.svg?height=32&width=32",
        missionsCompleted: 128,
        rank: 3,
        level: 10,
        badge: "bronze",
      },
      {
        id: 4,
        name: "Ahmad Santoso",
        avatar: "/placeholder.svg?height=32&width=32",
        missionsCompleted: 115,
        rank: 4,
        level: 9,
        badge: "none",
      },
      {
        id: 5,
        name: "Siti Rahayu",
        avatar: "/placeholder.svg?height=32&width=32",
        missionsCompleted: 98,
        rank: 5,
        level: 8,
        badge: "none",
      },
      {
        id: 15,
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        missionsCompleted: 67,
        rank: 15,
        level: 7,
        badge: "none",
      },
    ],
  })
  const [isProcessingDonation, setIsProcessingDonation] = useState(false)
  const [isProcessingMission, setIsProcessingMission] = useState(false)
  const [isProcessingApplication, setIsProcessingApplication] = useState(false)

  const handleDonation = async () => {
    if (!donationAmount || !selectedProgram) return

    setIsProcessingDonation(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newDonation = {
      id: donationHistory.length + 1,
      program: selectedProgram,
      amount: Number.parseInt(donationAmount),
      date: new Date().toISOString().split("T")[0],
      status: "completed",
    }

    setDonationHistory([newDonation, ...donationHistory])
    setDonationAmount("")
    setSelectedProgram("")
    setIsProcessingDonation(false)
    setIsDonationModalOpen(false)
  }

  const handleStartMission = async (missionId) => {
    setIsProcessingMission(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMissions(
      missions.map((mission) =>
        mission.id === missionId ? { ...mission, status: "in_progress", progress: 10 } : mission,
      ),
    )
    setIsProcessingMission(false)
    setIsMissionModalOpen(false)
  }

  const handleUMKMApplication = async () => {
    setIsProcessingApplication(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessingApplication(false)
    setIsUMKMApplicationOpen(false)
  }

  const handleTrainingRegistration = async (trainingId) => {
    const training = trainings.find((t) => t.id === trainingId)
    if (training && training.participants < training.maxParticipants) {
      setTrainings(trainings.map((t) => (t.id === trainingId ? { ...t, participants: t.participants + 1 } : t)))
    }
    setIsTrainingModalOpen(false)
  }

  const handleProfileUpdate = () => {
    setIsEditProfileOpen(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getMissionStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700"
      case "in_progress":
        return "bg-blue-100 text-blue-700"
      case "available":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getMissionStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "available":
        return <PlayCircle className="w-4 h-4" />
      default:
        return <PlayCircle className="w-4 h-4" />
    }
  }

  const getRankBadge = (rank, badge) => {
    if (rank === 1) {
      return <Crown className="w-5 h-5 text-amber-500" />
    }
    if (rank === 2) {
      return <Medal className="w-5 h-5 text-slate-400" />
    }
    if (rank === 3) {
      return <Medal className="w-5 h-5 text-amber-600" />
    }
    return <span className="text-sm font-bold text-slate-600">#{rank}</span>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">ImpactChain</h1>
                <p className="text-xs text-slate-500">Blockchain Social Impact</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                <Coins className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-semibold text-slate-700">2,450</span>
                <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                  Level 7
                </Badge>
              </div>

              <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-slate-800">
                    <Bell className="w-4 h-4" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-slate-800">Notifications</h4>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 border-b hover:bg-slate-50 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">Donasi berhasil diproses</p>
                          <p className="text-xs text-slate-500">Program Pendidikan Anak - Rp 50,000</p>
                          <p className="text-xs text-slate-400 mt-1">2 jam yang lalu</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b hover:bg-slate-50 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">Misi harian selesai</p>
                          <p className="text-xs text-slate-500">+25 poin earned</p>
                          <p className="text-xs text-slate-400 mt-1">5 jam yang lalu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-slate-600">
                      View All Notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Avatar className="ring-2 ring-slate-200 ring-offset-2">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-slate-600 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6 bg-white border border-slate-200 shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-100">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="donate" className="data-[state=active]:bg-slate-100">
              <Heart className="w-4 h-4 mr-2" />
              Donasi
            </TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:bg-slate-100">
              <Target className="w-4 h-4 mr-2" />
              Misi
            </TabsTrigger>
            <TabsTrigger value="umkm" className="data-[state=active]:bg-slate-100">
              <Building2 className="w-4 h-4 mr-2" />
              UMKM
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-slate-100">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-100">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-slate-800 to-slate-700 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Selamat Datang Kembali, {profileData.name}! 👋</h2>
                    <p className="text-slate-300">Anda telah membuat dampak luar biasa hari ini</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">+15% impact</span>
                    </div>
                    <p className="text-xs text-slate-400">vs minggu lalu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Donasi</CardTitle>
                    <DollarSign className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">Rp 2.4M</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Keluarga Terbantu</CardTitle>
                    <Users className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">1,247</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <Users className="w-4 h-4" />
                    <span>+89 minggu ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">UMKM Berkembang</CardTitle>
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">342</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+23 bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Misi Selesai</CardTitle>
                    <Target className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">5,678</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <Activity className="w-4 h-4" />
                    <span>+156 hari ini</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Activity className="w-5 h-5 text-slate-600" />
                    Aktivitas Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Donasi berhasil untuk Program Pendidikan</p>
                      <p className="text-xs text-slate-500">2 jam yang lalu</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      +50 poin
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Misi harian "Berbagi Kebaikan" selesai</p>
                      <p className="text-xs text-slate-500">5 jam yang lalu</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      +25 poin
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Mendukung UMKM "Warung Sari"</p>
                      <p className="text-xs text-slate-500">1 hari yang lalu</p>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                      +75 poin
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Award className="w-5 h-5 text-slate-600" />
                    Badge & Pencapaian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-medium text-amber-700">Donatur Emas</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-sm transition-shadow">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-medium text-blue-700">Misi Master</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-100 hover:shadow-sm transition-shadow">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-medium text-emerald-700">Pemberdaya</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Progress ke Level Berikutnya</p>
                        <p className="text-xs text-slate-500">2,450 / 3,000 poin</p>
                      </div>
                      <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                        Level 7
                      </Badge>
                    </div>
                    <Progress value={81.7} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donate Tab - Previous content remains the same */}
          <TabsContent value="donate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Shield className="w-5 h-5 text-slate-600" />
                    Donasi Blockchain Transparan
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Semua donasi dicatat dalam smart contract untuk transparansi penuh
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-slate-700">
                      Jumlah Donasi
                    </Label>
                    <Input
                      id="amount"
                      placeholder="Masukkan jumlah (Rp)"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program" className="text-slate-700">
                      Program Donasi
                    </Label>
                    <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Pilih program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendidikan Anak">Pendidikan Anak</SelectItem>
                        <SelectItem value="Kesehatan Masyarakat">Kesehatan Masyarakat</SelectItem>
                        <SelectItem value="Bantuan Pangan">Bantuan Pangan</SelectItem>
                        <SelectItem value="Bantuan Bencana">Bantuan Bencana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                        disabled={!donationAmount || !selectedProgram}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Donasi Sekarang
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Konfirmasi Donasi</DialogTitle>
                        <DialogDescription>
                          Pastikan detail donasi Anda sudah benar sebelum melanjutkan.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-600">Program:</span>
                            <span className="font-medium">{selectedProgram}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-600">Jumlah:</span>
                            <span className="font-medium">
                              {formatCurrency(Number.parseInt(donationAmount || "0"))}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Biaya Admin:</span>
                            <span className="font-medium">Gratis</span>
                          </div>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex items-center gap-2 text-sm text-emerald-700">
                            <Shield className="w-4 h-4" />
                            <span>Smart Contract: 0x742d...8f3a</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDonationModalOpen(false)}>
                          Batal
                        </Button>
                        <Button
                          onClick={handleDonation}
                          disabled={isProcessingDonation}
                          className="bg-slate-800 hover:bg-slate-700"
                        >
                          {isProcessingDonation ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Memproses...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Konfirmasi Donasi
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <Shield className="w-4 h-4" />
                      <span>Smart Contract: 0x742d...8f3a</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-emerald-600 hover:text-emerald-700">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Program Donasi Aktif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-800">Pendidikan Anak Desa</h4>
                        <Badge className="bg-emerald-100 text-emerald-700">Aktif</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">Membantu pendidikan 200 anak di daerah terpencil</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">Rp 850K / Rp 1.2M</span>
                        </div>
                        <Progress value={70.8} className="h-2" />
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-800">Bantuan Kesehatan</h4>
                        <Badge className="bg-emerald-100 text-emerald-700">Aktif</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">Penyediaan obat-obatan untuk puskesmas desa</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">Rp 1.1M / Rp 1.5M</span>
                        </div>
                        <Progress value={73.3} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation History */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <History className="w-5 h-5 text-slate-600" />
                    Riwayat Donasi
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {donationHistory.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{donation.program}</p>
                          <p className="text-xs text-slate-500">{donation.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-800">{formatCurrency(donation.amount)}</p>
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          {donation.status === "completed" ? "Berhasil" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions" className="space-y-6">
            {/* Mission Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Misi Selesai Hari Ini</CardTitle>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">3</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2 dari kemarin</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Poin Earned</CardTitle>
                    <Coins className="w-5 h-5 text-amber-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">150</div>
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <Star className="w-4 h-4" />
                    <span>Poin hari ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Streak</CardTitle>
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">7 hari</div>
                  <div className="flex items-center gap-1 text-sm text-orange-600">
                    <Activity className="w-4 h-4" />
                    <span>Konsistensi tinggi</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mission Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Missions */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Target className="w-5 h-5 text-slate-600" />
                    Misi Harian
                  </CardTitle>
                  <CardDescription className="text-slate-600">Reset setiap hari pukul 00:00 WIB</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {missions
                    .filter((mission) => mission.type === "daily")
                    .map((mission) => (
                      <div
                        key={mission.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            {getMissionStatusIcon(mission.status)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{mission.title}</p>
                            <p className="text-xs text-slate-600">{mission.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                +{mission.points} poin
                              </Badge>
                              {mission.status === "in_progress" && (
                                <div className="flex items-center gap-1">
                                  <Progress value={mission.progress} className="w-16 h-1" />
                                  <span className="text-xs text-slate-500">{mission.progress}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getMissionStatusColor(mission.status)}>
                            {mission.status === "completed"
                              ? "Selesai"
                              : mission.status === "in_progress"
                                ? "Berlangsung"
                                : "Tersedia"}
                          </Badge>
                          {mission.status === "available" && (
                            <Dialog open={isMissionModalOpen} onOpenChange={setIsMissionModalOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-slate-800 hover:bg-slate-700"
                                  onClick={() => setSelectedMission(mission)}
                                >
                                  Mulai
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Mulai Misi</DialogTitle>
                                  <DialogDescription>
                                    Apakah Anda yakin ingin memulai misi "{selectedMission?.title}"?
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="p-4 bg-slate-50 rounded-lg">
                                    <h4 className="font-medium mb-2">{selectedMission?.title}</h4>
                                    <p className="text-sm text-slate-600 mb-3">{selectedMission?.description}</p>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-slate-600">Reward:</span>
                                      <Badge variant="secondary">+{selectedMission?.points} poin</Badge>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsMissionModalOpen(false)}>
                                    Batal
                                  </Button>
                                  <Button
                                    onClick={() => handleStartMission(selectedMission?.id)}
                                    disabled={isProcessingMission}
                                    className="bg-slate-800 hover:bg-slate-700"
                                  >
                                    {isProcessingMission ? (
                                      <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Memulai...
                                      </>
                                    ) : (
                                      <>
                                        <PlayCircle className="w-4 h-4 mr-2" />
                                        Mulai Misi
                                      </>
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* Weekly Missions */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Trophy className="w-5 h-5 text-slate-600" />
                    Misi Mingguan
                  </CardTitle>
                  <CardDescription className="text-slate-600">Reset setiap Senin pukul 00:00 WIB</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {missions
                    .filter((mission) => mission.type === "weekly")
                    .map((mission) => (
                      <div
                        key={mission.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            {getMissionStatusIcon(mission.status)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{mission.title}</p>
                            <p className="text-xs text-slate-600">{mission.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                +{mission.points} poin
                              </Badge>
                              {mission.status === "in_progress" && (
                                <div className="flex items-center gap-1">
                                  <Progress value={mission.progress} className="w-16 h-1" />
                                  <span className="text-xs text-slate-500">{mission.progress}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getMissionStatusColor(mission.status)}>
                            {mission.status === "completed"
                              ? "Selesai"
                              : mission.status === "in_progress"
                                ? "Berlangsung"
                                : "Tersedia"}
                          </Badge>
                          <p className="text-xs text-slate-500">Deadline: {mission.deadline}</p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Mission History */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <History className="w-5 h-5 text-slate-600" />
                    Riwayat Misi
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="failed">Gagal</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Donasi Minimal Rp 10K</p>
                        <p className="text-xs text-slate-500">Diselesaikan pada 15 Des 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">+50 poin</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Baca Artikel Dampak</p>
                        <p className="text-xs text-slate-500">Diselesaikan pada 14 Des 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">+25 poin</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UMKM Tab */}
          <TabsContent value="umkm" className="space-y-6">
            {/* UMKM Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Total UMKM</CardTitle>
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">342</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+23 bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Hibah</CardTitle>
                    <DollarSign className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">Rp 1.2M</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+15% bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Rata-rata Growth</CardTitle>
                    <BarChart3 className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">48%</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Revenue growth</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Pelatihan Aktif</CardTitle>
                    <GraduationCap className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">3</div>
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    <span>Program tersedia</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Microgrant Program */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Building2 className="w-5 h-5 text-slate-600" />
                    Program Microgrant
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Dukung UMKM lokal dengan dana hibah dan pelatihan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600">342</div>
                      <p className="text-sm text-slate-600">UMKM Terbantu</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">Rp 1.2M</div>
                      <p className="text-sm text-slate-600">Total Hibah</p>
                    </div>
                  </div>

                  <Dialog open={isUMKMApplicationOpen} onOpenChange={setIsUMKMApplicationOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-slate-800 hover:bg-slate-700">
                        <Building2 className="w-4 h-4 mr-2" />
                        Ajukan Proposal UMKM
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Ajukan Proposal UMKM</DialogTitle>
                        <DialogDescription>
                          Lengkapi formulir berikut untuk mengajukan proposal hibah UMKM.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="business-name">Nama Usaha</Label>
                          <Input id="business-name" placeholder="Masukkan nama usaha" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Kategori Usaha</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kuliner">Kuliner</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="kerajinan">Kerajinan</SelectItem>
                              <SelectItem value="jasa">Jasa</SelectItem>
                              <SelectItem value="teknologi">Teknologi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Lokasi Usaha</Label>
                          <Input id="location" placeholder="Kota, Provinsi" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Deskripsi Usaha</Label>
                          <Textarea id="description" placeholder="Jelaskan usaha Anda..." rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="grant-amount">Jumlah Hibah yang Diajukan</Label>
                          <Input id="grant-amount" placeholder="Rp 0" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUMKMApplicationOpen(false)}>
                          Batal
                        </Button>
                        <Button
                          onClick={handleUMKMApplication}
                          disabled={isProcessingApplication}
                          className="bg-slate-800 hover:bg-slate-700"
                        >
                          {isProcessingApplication ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Mengirim...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Kirim Proposal
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText className="w-4 h-4" />
                      <span>Proses review: 3-5 hari kerja</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Training Programs */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <GraduationCap className="w-5 h-5 text-slate-600" />
                    Program Pelatihan
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Tingkatkan kemampuan bisnis dengan pelatihan gratis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trainings.map((training) => (
                    <div
                      key={training.id}
                      className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-800">{training.title}</h4>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {training.price === 0 ? "Gratis" : formatCurrency(training.price)}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{training.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>
                            {training.participants}/{training.maxParticipants} peserta
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{training.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>{training.level}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Instruktur: {training.instructor}</span>

                        <Dialog open={isTrainingModalOpen} onOpenChange={setIsTrainingModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-slate-800 hover:bg-slate-700"
                              onClick={() => setSelectedTraining(training)}
                              disabled={training.participants >= training.maxParticipants}
                            >
                              {training.participants >= training.maxParticipants ? "Penuh" : "Daftar"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Daftar Pelatihan</DialogTitle>
                              <DialogDescription>
                                Konfirmasi pendaftaran untuk "{selectedTraining?.title}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-slate-50 rounded-lg">
                                <h4 className="font-medium mb-2">{selectedTraining?.title}</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Durasi:</span>
                                    <span>{selectedTraining?.duration}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Mulai:</span>
                                    <span>{selectedTraining?.startDate}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Level:</span>
                                    <span>{selectedTraining?.level}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Biaya:</span>
                                    <span className="font-medium text-emerald-600">Gratis</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsTrainingModalOpen(false)}>
                                Batal
                              </Button>
                              <Button
                                onClick={() => handleTrainingRegistration(selectedTraining?.id)}
                                className="bg-slate-800 hover:bg-slate-700"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Konfirmasi Daftar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* UMKM Success Stories */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                    UMKM yang Berkembang
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="kuliner">Kuliner</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="kerajinan">Kerajinan</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {umkmData.map((umkm) => (
                    <div
                      key={umkm.id}
                      className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="ring-2 ring-slate-200">
                          <AvatarImage src={umkm.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-slate-600 text-white">
                            {umkm.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-slate-800">{umkm.name}</h4>
                          <p className="text-sm text-slate-600">{umkm.category}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <User className="w-3 h-3" />
                          <span>{umkm.owner}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPinIcon className="w-3 h-3" />
                          <span>{umkm.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{umkm.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Revenue Growth:</span>
                          <span className="font-medium text-emerald-600">+{umkm.revenueGrowth}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Hibah Diterima:</span>
                          <span className="font-medium">{formatCurrency(umkm.grantReceived)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Karyawan:</span>
                          <span>{umkm.employeeCount} orang</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            {/* Leaderboard Header */}
            <Card className="bg-gradient-to-r from-slate-800 to-slate-700 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
                    <p className="text-slate-300">Kompetisi sehat untuk dampak sosial yang lebih besar</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-400">#7</div>
                    <p className="text-xs text-slate-400">Peringkat Anda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Filter */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Label className="text-slate-700">Kategori:</Label>
                    <Select value={leaderboardFilter} onValueChange={setLeaderboardFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="donations">Top Donatur</SelectItem>
                        <SelectItem value="missions">Master Misi</SelectItem>
                        <SelectItem value="points">Total Poin</SelectItem>
                        <SelectItem value="streak">Streak Terpanjang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Bulan Ini
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Donators */}
              {leaderboardFilter === "donations" && (
                <Card className="border-slate-200 shadow-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Trophy className="w-5 h-5 text-slate-600" />
                      Top Donatur Bulan Ini
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Berdasarkan total donasi dalam bulan ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboardData.donations.map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-shadow hover:shadow-sm ${
                            user.name === "John Doe"
                              ? "bg-blue-50 border-blue-200"
                              : index < 3
                                ? "bg-amber-50 border-amber-200"
                                : "border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankBadge(user.rank, user.badge)}
                          </div>
                          <Avatar className="ring-2 ring-slate-200">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-slate-600 text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">
                              {user.name}
                              {user.name === "John Doe" && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Anda
                                </Badge>
                              )}
                            </p>
                            <p className="text-sm text-slate-600">{formatCurrency(user.amount)} donasi</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                index === 0
                                  ? "bg-amber-100 text-amber-700"
                                  : index === 1
                                    ? "bg-slate-100 text-slate-700"
                                    : index === 2
                                      ? "bg-amber-100 text-amber-600"
                                      : "bg-slate-100 text-slate-600"
                              }
                            >
                              {user.points} poin
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Mission Masters */}
              {leaderboardFilter === "missions" && (
                <Card className="border-slate-200 shadow-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Target className="w-5 h-5 text-slate-600" />
                      Master Misi
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Berdasarkan jumlah misi yang diselesaikan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboardData.missions.map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-shadow hover:shadow-sm ${
                            user.name === "John Doe"
                              ? "bg-blue-50 border-blue-200"
                              : index < 3
                                ? "bg-amber-50 border-amber-200"
                                : "border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankBadge(user.rank, user.badge)}
                          </div>
                          <Avatar className="ring-2 ring-slate-200">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-slate-600 text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">
                              {user.name}
                              {user.name === "John Doe" && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Anda
                                </Badge>
                              )}
                            </p>
                            <p className="text-sm text-slate-600">{user.missionsCompleted} misi selesai</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                index === 0
                                  ? "bg-amber-100 text-amber-700"
                                  : index === 1
                                    ? "bg-slate-100 text-slate-700"
                                    : index === 2
                                      ? "bg-amber-100 text-amber-600"
                                      : "bg-slate-100 text-slate-600"
                              }
                            >
                              Level {user.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Achievement Showcase */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Award className="w-5 h-5 text-slate-600" />
                  Hall of Fame
                </CardTitle>
                <CardDescription className="text-slate-600">Pencapaian luar biasa dari komunitas kami</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1">Donatur Terbesar</h4>
                    <p className="text-sm text-slate-600 mb-2">Ahmad Santoso</p>
                    <p className="text-lg font-bold text-amber-600">{formatCurrency(850000)}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1">Mission Master</h4>
                    <p className="text-sm text-slate-600 mb-2">Dewi Permata</p>
                    <p className="text-lg font-bold text-blue-600">156 Misi</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1">Streak Terpanjang</h4>
                    <p className="text-sm text-slate-600 mb-2">Linda Maharani</p>
                    <p className="text-lg font-bold text-emerald-600">45 Hari</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab - Previous content remains the same */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 ring-4 ring-slate-200 ring-offset-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="bg-slate-600 text-white text-2xl">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                      <h2 className="text-2xl font-bold text-slate-800">{profileData.name}</h2>
                      <Badge className="bg-amber-100 text-amber-700">
                        <Star className="w-3 h-3 mr-1" />
                        Level 7
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-4">Donatur Emas • Member sejak Januari 2024</p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-800">2,450</div>
                        <div className="text-xs text-slate-500">Total Poin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-800">Rp 320K</div>
                        <div className="text-xs text-slate-500">Total Donasi</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-800">67</div>
                        <div className="text-xs text-slate-500">Misi Selesai</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-800">12</div>
                        <div className="text-xs text-slate-500">Badge Earned</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-200 bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>

                    <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-slate-800 hover:bg-slate-700">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>Update your profile information here.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={profileData.bio}
                              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleProfileUpdate} className="bg-slate-800 hover:bg-slate-700">
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Info */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <User className="w-5 h-5 text-slate-600" />
                    Informasi Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Email</p>
                        <p className="text-xs text-slate-600">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Telepon</p>
                        <p className="text-xs text-slate-600">{profileData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Lokasi</p>
                        <p className="text-xs text-slate-600">{profileData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <CalendarIcon className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Bergabung</p>
                        <p className="text-xs text-slate-600">15 Januari 2024</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700" onClick={() => setIsEditProfileOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Informasi
                  </Button>
                </CardContent>
              </Card>

              {/* Achievement & Badges */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Award className="w-5 h-5 text-slate-600" />
                    Badge Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-amber-700">Donatur Emas</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-blue-700">Misi Master</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-100 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-emerald-700">Pemberdaya</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-slate-700">Inspirator</p>
                    </div>
                    <div className="text-center p-3 bg-rose-50 rounded-lg border border-rose-100 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-rose-700">Dermawan</p>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-100 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-indigo-700">Pionir</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2">12 dari 25 badge terkumpul</p>
                    <Progress value={48} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Settings & Preferences */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Settings className="w-5 h-5 text-slate-600" />
                    Pengaturan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Notifikasi Push</p>
                          <p className="text-xs text-slate-600">Terima update misi & donasi</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Email Newsletter</p>
                          <p className="text-xs text-slate-600">Update mingguan dampak</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Profil Privat</p>
                          <p className="text-xs text-slate-600">Sembunyikan dari leaderboard</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Separator className="bg-slate-200" />
                  <div className="space-y-2">
                    <Dialog open={isPaymentMethodOpen} onOpenChange={setIsPaymentMethodOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-slate-200 bg-transparent">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Metode Pembayaran
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Metode Pembayaran</DialogTitle>
                          <DialogDescription>Kelola metode pembayaran untuk donasi Anda.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 border border-slate-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-slate-600" />
                                <div>
                                  <p className="font-medium">**** **** **** 1234</p>
                                  <p className="text-sm text-slate-500">Expires 12/26</p>
                                </div>
                              </div>
                              <Badge>Primary</Badge>
                            </div>
                          </div>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Payment Method
                          </Button>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setIsPaymentMethodOpen(false)}>Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="w-full border-slate-200 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
