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
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Shield,
  Users,
  TrendingUp,
  DollarSign,
  Building2,
  BarChart3,
  Settings,
  Bell,
  Search,
  Download,
  Upload,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  RefreshCw,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  Activity,
  UserCheck,
  Database,
  Ban,
  User,
} from "lucide-react"

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isUMKMModalOpen, setIsUMKMModalOpen] = useState(false)
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [selectedUMKM, setSelectedUMKM] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for admin dashboard
  const [dashboardStats] = useState({
    totalUsers: 12847,
    activeUsers: 8934,
    totalDonations: 2450000000,
    totalUMKM: 342,
    pendingApprovals: 23,
    systemHealth: 98.5,
    blockchainTx: 15678,
    monthlyGrowth: 15.2,
  })

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmad Santoso",
      email: "ahmad@email.com",
      phone: "+62 812-3456-7890",
      location: "Jakarta, Indonesia",
      joinDate: "2024-01-15",
      status: "active",
      level: 8,
      totalDonations: 850000,
      missionsCompleted: 45,
      lastActive: "2024-12-17",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Siti Rahayu",
      email: "siti@email.com",
      phone: "+62 813-7890-1234",
      location: "Bandung, Indonesia",
      joinDate: "2024-02-20",
      status: "suspended",
      level: 6,
      totalDonations: 720000,
      missionsCompleted: 32,
      lastActive: "2024-12-10",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Budi Pratama",
      email: "budi@email.com",
      phone: "+62 814-2345-6789",
      location: "Surabaya, Indonesia",
      joinDate: "2024-03-10",
      status: "active",
      level: 7,
      totalDonations: 650000,
      missionsCompleted: 38,
      lastActive: "2024-12-17",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  const [donations, setDonations] = useState([
    {
      id: 1,
      donor: "Ahmad Santoso",
      program: "Pendidikan Anak Desa",
      amount: 500000,
      date: "2024-12-17",
      status: "completed",
      txHash: "0x742d35cc6cf34e8f3a...",
      method: "blockchain",
    },
    {
      id: 2,
      donor: "Siti Rahayu",
      program: "Bantuan Kesehatan",
      amount: 750000,
      date: "2024-12-16",
      status: "pending",
      txHash: "0x8f3a742d35cc6cf34e...",
      method: "bank_transfer",
    },
    {
      id: 3,
      donor: "Budi Pratama",
      program: "UMKM Warung Sari",
      amount: 300000,
      date: "2024-12-15",
      status: "failed",
      txHash: "0x34e8f3a742d35cc6cf...",
      method: "blockchain",
    },
  ])

  const [umkmApplications, setUmkmApplications] = useState([
    {
      id: 1,
      businessName: "Warung Sari Rasa",
      owner: "Sari Dewi",
      category: "Kuliner",
      location: "Bandung, Jawa Barat",
      requestedAmount: 2500000,
      description: "Warung makan tradisional dengan menu khas Sunda yang ingin mengembangkan usaha catering",
      submissionDate: "2024-12-10",
      status: "pending",
      documents: ["business_plan.pdf", "financial_report.xlsx", "id_card.jpg"],
      phone: "+62 812-3456-7890",
      email: "sari@email.com",
    },
    {
      id: 2,
      businessName: "Kerajinan Bambu Indah",
      owner: "Indah Permata",
      category: "Kerajinan",
      location: "Yogyakarta, DIY",
      requestedAmount: 3200000,
      description: "Kerajinan tangan dari bahan bambu ramah lingkungan untuk pasar ekspor",
      submissionDate: "2024-12-08",
      status: "approved",
      documents: ["business_plan.pdf", "product_catalog.pdf", "export_license.pdf"],
      phone: "+62 813-7890-1234",
      email: "indah@email.com",
    },
    {
      id: 3,
      businessName: "Toko Digital Maju",
      owner: "Budi Santoso",
      category: "Teknologi",
      location: "Surabaya, Jawa Timur",
      requestedAmount: 1800000,
      description: "Platform e-commerce untuk UMKM lokal dengan sistem pembayaran digital",
      submissionDate: "2024-12-05",
      status: "rejected",
      documents: ["business_plan.pdf", "technical_spec.pdf"],
      phone: "+62 814-2345-6789",
      email: "budi.tech@email.com",
      rejectionReason: "Proposal kurang detail dalam aspek teknis dan market analysis",
    },
  ])

  const [systemLogs] = useState([
    {
      id: 1,
      timestamp: "2024-12-17 14:30:25",
      level: "info",
      action: "User Login",
      user: "Ahmad Santoso",
      details: "Successful login from IP 192.168.1.100",
    },
    {
      id: 2,
      timestamp: "2024-12-17 14:25:10",
      level: "warning",
      action: "Failed Payment",
      user: "Siti Rahayu",
      details: "Payment failed for donation ID #1234 - Insufficient funds",
    },
    {
      id: 3,
      timestamp: "2024-12-17 14:20:05",
      level: "error",
      action: "Blockchain Error",
      user: "System",
      details: "Smart contract execution failed - Gas limit exceeded",
    },
    {
      id: 4,
      timestamp: "2024-12-17 14:15:30",
      level: "info",
      action: "UMKM Application",
      user: "Indah Permata",
      details: "New UMKM application submitted for review",
    },
  ])

  const handleUserAction = async (userId, action) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: action === "activate" ? "active" : action === "suspend" ? "suspended" : user.status,
            }
          : user,
      ),
    )

    setIsLoading(false)
    setIsUserModalOpen(false)
  }

  const handleDonationAction = async (donationId, action) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setDonations(
      donations.map((donation) =>
        donation.id === donationId
          ? {
              ...donation,
              status: action === "approve" ? "completed" : action === "reject" ? "failed" : donation.status,
            }
          : donation,
      ),
    )

    setIsLoading(false)
    setIsDonationModalOpen(false)
  }

  const handleUMKMAction = async (umkmId, action, reason = "") => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUmkmApplications(
      umkmApplications.map((umkm) =>
        umkm.id === umkmId
          ? {
              ...umkm,
              status: action === "approve" ? "approved" : action === "reject" ? "rejected" : umkm.status,
              rejectionReason: action === "reject" ? reason : umkm.rejectionReason,
            }
          : umkm,
      ),
    )

    setIsLoading(false)
    setIsUMKMModalOpen(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700">Aktif</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-700">Suspended</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700">Selesai</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-700">Gagal</Badge>
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-700">Disetujui</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Ditolak</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700">{status}</Badge>
    }
  }

  const getLogLevelColor = (level) => {
    switch (level) {
      case "error":
        return "text-red-600"
      case "warning":
        return "text-amber-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Background Pattern */}
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
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-xs text-slate-500">ImpactChain Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                <Database className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">System Health: 98.5%</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  Online
                </Badge>
              </div>

              <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-slate-800">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>

              <Avatar className="ring-2 ring-slate-200 ring-offset-2">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-slate-600 text-white">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6 bg-white border border-slate-200 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-100">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="donations" className="data-[state=active]:bg-slate-100">
              <Heart className="w-4 h-4 mr-2" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="umkm" className="data-[state=active]:bg-slate-100">
              <Building2 className="w-4 h-4 mr-2" />
              UMKM
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-slate-100">
              <Settings className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-slate-100">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
                    <Users className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    {dashboardStats.totalUsers.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{dashboardStats.monthlyGrowth}% bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Donations</CardTitle>
                    <DollarSign className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    {formatCurrency(dashboardStats.totalDonations)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18% bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Active UMKM</CardTitle>
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">{dashboardStats.totalUMKM}</div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+23 bulan ini</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">Pending Approvals</CardTitle>
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">{dashboardStats.pendingApprovals}</div>
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Perlu review</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Activity className="w-5 h-5 text-slate-600" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">Database</p>
                          <p className="text-xs text-slate-600">Response time: 45ms</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">Blockchain Network</p>
                          <p className="text-xs text-slate-600">Block height: 15,678</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">Synced</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">Payment Gateway</p>
                          <p className="text-xs text-slate-600">Success rate: 97.8%</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">Warning</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Overall System Health</p>
                        <p className="text-xs text-slate-500">{dashboardStats.systemHealth}%</p>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        Excellent
                      </Badge>
                    </div>
                    <Progress value={dashboardStats.systemHealth} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Clock className="w-5 h-5 text-slate-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${getLogLevelColor(log.level).replace("text-", "bg-")}`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-slate-800">{log.action}</p>
                            <span className="text-xs text-slate-500">{log.timestamp.split(" ")[1]}</span>
                          </div>
                          <p className="text-xs text-slate-600">{log.details}</p>
                          {log.user !== "System" && <p className="text-xs text-slate-500 mt-1">User: {log.user}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Users Header */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Cari pengguna..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">User Management</CardTitle>
                <CardDescription className="text-slate-600">
                  Kelola pengguna platform dan monitor aktivitas mereka
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Total Donasi</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-slate-800">{user.name}</p>
                              <p className="text-sm text-slate-600">{user.location}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-slate-800">{user.email}</p>
                            <p className="text-sm text-slate-600">{user.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Level {user.level}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(user.totalDonations)}</TableCell>
                        <TableCell className="text-sm text-slate-600">{user.lastActive}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsUserModalOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "suspend")}
                                  className="text-red-600"
                                >
                                  <Ban className="w-4 h-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "activate")}
                                  className="text-emerald-600"
                                >
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Activate User
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            {/* Donations Header */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="Cari donasi..." className="pl-10 w-64" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Gagal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donations Table */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Donation Management</CardTitle>
                <CardDescription className="text-slate-600">
                  Monitor dan kelola semua transaksi donasi di platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.donor}</TableCell>
                        <TableCell>{donation.program}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(donation.amount)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {donation.method.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(donation.status)}</TableCell>
                        <TableCell className="text-sm text-slate-600">{donation.date}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedDonation(donation)
                                  setIsDonationModalOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View on Blockchain
                              </DropdownMenuItem>
                              {donation.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDonationAction(donation.id, "approve")}
                                    className="text-emerald-600"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDonationAction(donation.id, "reject")}
                                    className="text-red-600"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UMKM Tab */}
          <TabsContent value="umkm" className="space-y-6">
            {/* UMKM Header */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="Cari UMKM..." className="pl-10 w-64" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* UMKM Applications */}
            <div className="grid grid-cols-1 gap-6">
              {umkmApplications.map((umkm) => (
                <Card key={umkm.id} className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-800">{umkm.businessName}</CardTitle>
                        <CardDescription className="text-slate-600">
                          {umkm.category} • {umkm.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(umkm.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUMKM(umkm)
                                setIsUMKMModalOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {umkm.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleUMKMAction(umkm.id, "approve")}
                                  className="text-emerald-600"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUMKM(umkm)
                                    setIsUMKMModalOpen(true)
                                  }}
                                  className="text-red-600"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Business Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">Owner:</span>
                              <span>{umkm.owner}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">Email:</span>
                              <span>{umkm.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">Phone:</span>
                              <span>{umkm.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">Submitted:</span>
                              <span>{umkm.submissionDate}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Description</h4>
                          <p className="text-sm text-slate-600">{umkm.description}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Grant Request</h4>
                          <div className="text-2xl font-bold text-slate-800">
                            {formatCurrency(umkm.requestedAmount)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Documents</h4>
                          <div className="space-y-1">
                            {umkm.documents.map((doc, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <FileText className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600">{doc}</span>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        {umkm.status === "rejected" && umkm.rejectionReason && (
                          <Alert className="border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700">
                              <strong>Rejection Reason:</strong> {umkm.rejectionReason}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            {/* System Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Settings className="w-5 h-5 text-slate-600" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Maintenance Mode</p>
                        <p className="text-xs text-slate-600">Enable system maintenance</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Auto Approval</p>
                        <p className="text-xs text-slate-600">Auto approve donations under Rp 100K</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                        <p className="text-xs text-slate-600">Send system notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button className="w-full bg-slate-800 hover:bg-slate-700">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restart System
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Backup Database
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Database className="w-5 h-5 text-slate-600" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-lg font-bold text-emerald-600">99.9%</div>
                      <p className="text-xs text-slate-600">Uptime</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-lg font-bold text-blue-600">45ms</div>
                      <p className="text-xs text-slate-600">Response Time</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Storage Used:</span>
                      <span className="font-medium">2.4 GB / 10 GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Active Connections:</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Queries/sec:</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Logs */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-slate-600" />
                    System Logs
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${getLogLevelColor(log.level).replace("text-", "bg-")}`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium uppercase ${getLogLevelColor(log.level)}`}>
                              {log.level}
                            </span>
                            <span className="text-sm font-medium text-slate-800">{log.action}</span>
                          </div>
                          <span className="text-xs text-slate-500">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-slate-600">{log.details}</p>
                        {log.user !== "System" && <p className="text-xs text-slate-500 mt-1">User: {log.user}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Analytics & Reports</CardTitle>
                <CardDescription className="text-slate-600">
                  Generate comprehensive reports and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Users className="w-6 h-6" />
                    <span>User Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Heart className="w-6 h-6" />
                    <span>Donation Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Building2 className="w-6 h-6" />
                    <span>UMKM Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    <span>Financial Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Activity className="w-6 h-6" />
                    <span>Activity Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Shield className="w-6 h-6" />
                    <span>Security Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Detail Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{selectedUser.name}</h3>
                  <p className="text-slate-600">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedUser.status)}
                    <Badge variant="secondary">Level {selectedUser.level}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>{selectedUser.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{selectedUser.location}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Account Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Join Date:</span>
                        <span>{selectedUser.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Last Active:</span>
                        <span>{selectedUser.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Activity Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Donations:</span>
                        <span className="font-medium">{formatCurrency(selectedUser.totalDonations)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Missions Completed:</span>
                        <span className="font-medium">{selectedUser.missionsCompleted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
              Close
            </Button>
            {selectedUser?.status === "active" ? (
              <Button
                onClick={() => handleUserAction(selectedUser.id, "suspend")}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Ban className="w-4 h-4 mr-2" />}
                Suspend User
              </Button>
            ) : (
              <Button
                onClick={() => handleUserAction(selectedUser.id, "activate")}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <UserCheck className="w-4 h-4 mr-2" />
                )}
                Activate User
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UMKM Detail Modal */}
      <Dialog open={isUMKMModalOpen} onOpenChange={setIsUMKMModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>UMKM Application Review</DialogTitle>
            <DialogDescription>Review and take action on {selectedUMKM?.businessName}</DialogDescription>
          </DialogHeader>
          {selectedUMKM && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Business Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Business Name:</span>
                        <span className="font-medium">{selectedUMKM.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Category:</span>
                        <span>{selectedUMKM.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Owner:</span>
                        <span>{selectedUMKM.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Location:</span>
                        <span>{selectedUMKM.location}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Grant Request</h4>
                    <div className="text-2xl font-bold text-slate-800">
                      {formatCurrency(selectedUMKM.requestedAmount)}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>{selectedUMKM.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>{selectedUMKM.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Documents</h4>
                    <div className="space-y-1">
                      {selectedUMKM.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded border">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-2">Business Description</h4>
                <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">{selectedUMKM.description}</p>
              </div>

              {selectedUMKM.status === "rejected" && selectedUMKM.rejectionReason && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    <strong>Previous Rejection Reason:</strong> {selectedUMKM.rejectionReason}
                  </AlertDescription>
                </Alert>
              )}

              {selectedUMKM.status === "pending" && (
                <div className="space-y-3">
                  <Label htmlFor="rejectionReason">Rejection Reason (if rejecting)</Label>
                  <Textarea id="rejectionReason" placeholder="Provide detailed reason for rejection..." rows={3} />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUMKMModalOpen(false)}>
              Close
            </Button>
            {selectedUMKM?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleUMKMAction(selectedUMKM.id, "reject", "Proposal needs improvement")}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </Button>
                <Button
                  onClick={() => handleUMKMAction(selectedUMKM.id, "approve")}
                  disabled={isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
