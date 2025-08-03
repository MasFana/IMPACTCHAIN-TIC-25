import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "user" | "admin"
  totalDonations: number
  impactScore: number
  rank: number
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}))
