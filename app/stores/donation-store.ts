import { create } from "zustand"

interface Donation {
  id: number
  causeId: number
  amount: number
  message?: string
  isAnonymous: boolean
  createdAt: string
  status: "pending" | "completed" | "failed"
}

interface DonationStore {
  donations: Donation[]
  totalDonated: number
  addDonation: (donation: Omit<Donation, "id" | "createdAt">) => void
  updateDonationStatus: (id: number, status: Donation["status"]) => void
}

export const useDonationStore = create<DonationStore>((set) => ({
  donations: [],
  totalDonated: 0,
  addDonation: (donation) =>
    set((state) => {
      const newDonation: Donation = {
        ...donation,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "pending",
      }
      return {
        donations: [newDonation, ...state.donations],
        totalDonated: state.totalDonated + donation.amount,
      }
    }),
  updateDonationStatus: (id, status) =>
    set((state) => ({
      donations: state.donations.map((donation) => (donation.id === id ? { ...donation, status } : donation)),
    })),
}))
