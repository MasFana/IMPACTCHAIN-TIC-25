import { create } from "zustand"

interface Notification {
  id: string
  type: "donation" | "mission" | "community" | "system"
  title: string
  message: string
  time: string
  read: boolean
  icon?: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: "1",
      type: "donation",
      title: "Donasi Berhasil",
      message: "Donasi Anda untuk Pendidikan Anak sebesar Rp 100.000 telah berhasil",
      time: "2 menit lalu",
      read: false,
    },
    {
      id: "2",
      type: "mission",
      title: "Misi Selesai",
      message: 'Anda telah menyelesaikan misi "Berbagi Kebaikan" dan mendapat 50 poin',
      time: "1 jam lalu",
      read: false,
    },
    {
      id: "3",
      type: "community",
      title: "Update Komunitas",
      message: "5 anggota baru bergabung dalam komunitas Anda",
      time: "3 jam lalu",
      read: false,
    },
  ],
  unreadCount: 3,
  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        read: false,
      }
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
      unreadCount: state.notifications.find((n) => n.id === id && !n.read) ? state.unreadCount - 1 : state.unreadCount,
    })),
}))
