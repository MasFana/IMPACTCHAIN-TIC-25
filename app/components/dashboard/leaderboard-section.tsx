import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Heart, Target } from "lucide-react"

export function LeaderboardSection() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Ahmad Rizki",
      avatar: "/placeholder.svg?height=40&width=40",
      totalDonations: 5750000,
      missionsCompleted: 45,
      impactScore: 9.8,
      badge: "Impact Champion",
      badgeColor: "bg-yellow-500",
    },
    {
      rank: 2,
      name: "Siti Nurhaliza",
      avatar: "/placeholder.svg?height=40&width=40",
      totalDonations: 4200000,
      missionsCompleted: 38,
      impactScore: 9.5,
      badge: "Social Hero",
      badgeColor: "bg-blue-500",
    },
    {
      rank: 3,
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
      totalDonations: 3800000,
      missionsCompleted: 32,
      impactScore: 9.2,
      badge: "Community Leader",
      badgeColor: "bg-green-500",
    },
    {
      rank: 4,
      name: "Maya Sari",
      avatar: "/placeholder.svg?height=40&width=40",
      totalDonations: 3200000,
      missionsCompleted: 28,
      impactScore: 8.9,
      badge: "Generous Giver",
      badgeColor: "bg-purple-500",
    },
    {
      rank: 5,
      name: "Andi Wijaya",
      avatar: "/placeholder.svg?height=40&width=40",
      totalDonations: 2900000,
      missionsCompleted: 25,
      impactScore: 8.7,
      badge: "Rising Star",
      badgeColor: "bg-pink-500",
    },
    {
      rank: 6,
      name: "Anda",
      avatar: "/placeholder.svg?height=40&width=40",
      totalDonations: 2450000,
      missionsCompleted: 23,
      impactScore: 8.4,
      badge: "Active Contributor",
      badgeColor: "bg-indigo-500",
      isCurrentUser: true,
    },
  ]

  const categories = [
    {
      title: "Top Donatur",
      icon: Heart,
      color: "text-red-500",
      leaders: leaderboardData.slice(0, 3).map((user) => ({
        ...user,
        value: `Rp ${user.totalDonations.toLocaleString("id-ID")}`,
      })),
    },
    {
      title: "Mission Master",
      icon: Target,
      color: "text-blue-500",
      leaders: leaderboardData
        .sort((a, b) => b.missionsCompleted - a.missionsCompleted)
        .slice(0, 3)
        .map((user) => ({
          ...user,
          value: `${user.missionsCompleted} misi`,
        })),
    },
    {
      title: "Impact Score",
      icon: TrendingUp,
      color: "text-green-500",
      leaders: leaderboardData
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, 3)
        .map((user) => ({
          ...user,
          value: user.impactScore.toString(),
        })),
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <p className="text-muted-foreground">Lihat ranking kontributor terbaik dalam platform</p>
      </div>

      {/* Category Leaderboards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <Card key={index} className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.leaders.map((leader, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/50">
                    <div className="flex-shrink-0">{getRankIcon(leader.rank)}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={leader.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{leader.name}</p>
                      <p className="text-xs text-muted-foreground">{leader.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overall Leaderboard */}
      <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle>Leaderboard Keseluruhan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                  user.isCurrentUser
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              >
                <div className="flex-shrink-0">{getRankIcon(user.rank)}</div>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">
                        Anda
                      </Badge>
                    )}
                  </div>
                  <Badge className={`${user.badgeColor} text-white text-xs`}>{user.badge}</Badge>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium">Rp {user.totalDonations.toLocaleString("id-ID")}</p>
                      <p className="text-xs text-muted-foreground">Total Donasi</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{user.missionsCompleted}</p>
                      <p className="text-xs text-muted-foreground">Misi</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{user.impactScore}</p>
                      <p className="text-xs text-muted-foreground">Impact Score</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
