import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Target, Trophy, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Donasi",
      value: "Rp 2.450.000",
      change: "+12%",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Misi Selesai",
      value: "23",
      change: "+5",
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Poin Terkumpul",
      value: "1,250",
      change: "+150",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Impact Score",
      value: "8.7",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Donasi untuk Pendidikan Anak",
      amount: "Rp 100.000",
      time: "2 jam lalu",
      status: "completed",
    },
    {
      id: 2,
      action: "Menyelesaikan Misi Berbagi",
      amount: "+50 poin",
      time: "1 hari lalu",
      status: "completed",
    },
    {
      id: 3,
      action: "Support UMKM Lokal",
      amount: "Rp 75.000",
      time: "2 hari lalu",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change} dari bulan lalu</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle>Target Bulanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Donasi</span>
                <span>Rp 2.45M / Rp 3M</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Misi</span>
                <span>23 / 30</span>
              </div>
              <Progress value={77} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Impact Score</span>
                <span>8.7 / 10</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{activity.amount}</p>
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {activity.status === "completed" ? "Selesai" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
