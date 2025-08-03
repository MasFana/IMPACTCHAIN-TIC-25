import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Heart, Trophy, Users } from "lucide-react"

export function NotificationPanel() {
  const notifications = [
    {
      id: 1,
      type: "donation",
      title: "Donasi Berhasil",
      message: "Donasi Anda untuk Pendidikan Anak sebesar Rp 100.000 telah berhasil",
      time: "2 menit lalu",
      icon: Heart,
      color: "text-red-500",
    },
    {
      id: 2,
      type: "mission",
      title: "Misi Selesai",
      message: "Anda telah menyelesaikan misi 'Berbagi Kebaikan' dan mendapat 50 poin",
      time: "1 jam lalu",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      id: 3,
      type: "community",
      title: "Update Komunitas",
      message: "5 anggota baru bergabung dalam komunitas Anda",
      time: "3 jam lalu",
      icon: Users,
      color: "text-blue-500",
    },
  ]

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifikasi
          <Badge variant="secondary" className="ml-auto">
            {notifications.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <div
              key={notification.id}
              className="flex gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
            >
              <Icon className={`h-5 w-5 mt-1 ${notification.color}`} />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          )
        })}

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          Lihat Semua Notifikasi
        </Button>
      </CardContent>
    </Card>
  )
}
