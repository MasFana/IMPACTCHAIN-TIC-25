import { create } from "zustand"

interface DashboardStats {
  totalDonations: number
  familiesHelped: number
  umkmGrowing: number
  missionsCompleted: number
  impactScore: number
  rank: number
}

interface Activity {
  id: string
  title: string
  timestamp: string
  type: "donation" | "mission" | "umkm"
  points: number
}

interface Badge {
  id: string
  name: string
  earned: boolean
  bgColor: string
  iconBg: string
  textColor: string
}

interface Achievements {
  badges: Badge[]
  currentLevel: number
  currentPoints: number
  nextLevelPoints: number
  progressPercentage: number
}

interface DashboardStore {
  stats: DashboardStats
  activities: Activity[]
  achievements: Achievements
  activeTab: string
  setActiveTab: (tab: string) => void
  updateStats: (stats: Partial<DashboardStats>) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: {
    totalDonations: 2450000,
    familiesHelped: 1247,
    umkmGrowing: 342,
    missionsCompleted: 23,
    impactScore: 8.4,
    rank: 6,
  },
  activities: [
    {
      id: "1",
      title: "Donasi berhasil untuk Program Pendidikan",
      timestamp: "2 jam yang lalu",
      type: "donation",
      points: 50,
    },
    {
      id: "2",
      title: 'Misi harian "Berbagi Kebaikan" selesai',
      timestamp: "5 jam yang lalu",
      type: "mission",
      points: 25,
    },
    {
      id: "3",
      title: 'Mendukung UMKM "Warung Sari"',
      timestamp: "1 hari yang lalu",
      type: "umkm",
      points: 75,
    },
  ],
  achievements: {
    badges: [
      {
        id: "1",
        name: "Donatur Emas",
        earned: true,
        bgColor: "bg-amber-50 border-amber-100",
        iconBg: "bg-amber-500",
        textColor: "text-amber-700",
      },
      {
        id: "2",
        name: "Misi Master",
        earned: true,
        bgColor: "bg-blue-50 border-blue-100",
        iconBg: "bg-blue-500",
        textColor: "text-blue-700",
      },
      {
        id: "3",
        name: "Pemberdaya",
        earned: true,
        bgColor: "bg-emerald-50 border-emerald-100",
        iconBg: "bg-emerald-500",
        textColor: "text-emerald-700",
      },
    ],
    currentLevel: 7,
    currentPoints: 2450,
    nextLevelPoints: 3000,
    progressPercentage: 81.7,
  },
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
}))
