import { create } from "zustand"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalDonations: number
  totalUMKM: number
  pendingApprovals: number
  systemHealth: number
  blockchainTx: number
  monthlyGrowth: number
}

interface SystemStatus {
  id: string
  name: string
  status: "healthy" | "warning" | "error"
  details: string
}

interface SystemLog {
  id: string
  timestamp: string
  level: "info" | "warning" | "error"
  action: string
  user: string
  details: string
}

interface AdminStats {
  totalUsers: number
  totalDonations: number
  totalUMKM: number
  systemHealth: number
}

interface AdminStore {
  stats: AdminStats
  dashboardStats: DashboardStats
  systemStatus: SystemStatus[]
  recentLogs: SystemLog[]
  activeTab: string
  setActiveTab: (tab: string) => void
  updateStats: (stats: Partial<AdminStats>) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  stats: {
    totalUsers: 1234,
    totalDonations: 15750000,
    totalUMKM: 127,
    systemHealth: 98.5,
  },
  dashboardStats: {
    totalUsers: 12847,
    activeUsers: 8934,
    totalDonations: 2450000000,
    totalUMKM: 342,
    pendingApprovals: 23,
    systemHealth: 98.5,
    blockchainTx: 15678,
    monthlyGrowth: 15.2,
  },
  systemStatus: [
    {
      id: "1",
      name: "Database",
      status: "healthy",
      details: "Response time: 45ms",
    },
    {
      id: "2",
      name: "Blockchain Network",
      status: "healthy",
      details: "Block height: 15,678",
    },
    {
      id: "3",
      name: "Payment Gateway",
      status: "warning",
      details: "Success rate: 97.8%",
    },
  ],
  recentLogs: [
    {
      id: "1",
      timestamp: "2024-12-17 14:30:25",
      level: "info",
      action: "User Login",
      user: "Ahmad Santoso",
      details: "Successful login from IP 192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2024-12-17 14:25:10",
      level: "warning",
      action: "Failed Payment",
      user: "Siti Rahayu",
      details: "Payment failed for donation ID #1234 - Insufficient funds",
    },
    {
      id: "3",
      timestamp: "2024-12-17 14:20:05",
      level: "error",
      action: "Blockchain Error",
      user: "System",
      details: "Smart contract execution failed - Gas limit exceeded",
    },
    {
      id: "4",
      timestamp: "2024-12-17 14:15:30",
      level: "info",
      action: "UMKM Application",
      user: "Indah Permata",
      details: "New UMKM application submitted for review",
    },
  ],
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
}))
