"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, Trophy, Star, Users, CheckCircle } from "lucide-react"

export function MissionsSection() {
  const [completedMissions, setCompletedMissions] = useState<number[]>([])

  const missions = [
    {
      id: 1,
      title: "Berbagi Kebaikan Pertama",
      description: "Lakukan donasi pertama Anda minimal Rp 50.000",
      reward: 100,
      difficulty: "Mudah",
      timeLimit: "7 hari",
      progress: 0,
      maxProgress: 1,
      category: "Donasi",
      icon: Target,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Konsisten Berdonasi",
      description: "Lakukan donasi selama 3 hari berturut-turut",
      reward: 250,
      difficulty: "Sedang",
      timeLimit: "14 hari",
      progress: 1,
      maxProgress: 3,
      category: "Donasi",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      id: 3,
      title: "Ajak Teman Berdonasi",
      description: "Ajak 5 teman untuk bergabung dan berdonasi",
      reward: 500,
      difficulty: "Sulit",
      timeLimit: "30 hari",
      progress: 2,
      maxProgress: 5,
      category: "Komunitas",
      icon: Users,
      color: "text-green-500",
    },
    {
      id: 4,
      title: "Support UMKM Lokal",
      description: "Berikan dukungan untuk 3 UMKM berbeda",
      reward: 300,
      difficulty: "Sedang",
      timeLimit: "21 hari",
      progress: 0,
      maxProgress: 3,
      category: "UMKM",
      icon: Star,
      color: "text-purple-500",
    },
  ]

  const completeMission = (missionId: number) => {
    setCompletedMissions([...completedMissions, missionId])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800"
      case "Sedang":
        return "bg-yellow-100 text-yellow-800"
      case "Sulit":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Misi Sosial</h2>
          <p className="text-muted-foreground">Selesaikan misi untuk mendapatkan poin dan badge</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Poin</p>
          <p className="text-2xl font-bold text-yellow-600">1,250</p>
        </div>
      </div>

      {/* Mission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Misi Aktif</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Selesai</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Badge</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">Level 3</p>
            <p className="text-sm text-muted-foreground">Impact Hero</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission) => {
          const Icon = mission.icon
          const progress = (mission.progress / mission.maxProgress) * 100
          const isCompleted = completedMissions.includes(mission.id)

          return (
            <Card
              key={mission.id}
              className={`backdrop-blur-sm bg-white/80 border-white/20 shadow-xl ${isCompleted ? "opacity-75" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${mission.color}`} />
                    <div>
                      <CardTitle className="text-lg">{mission.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {mission.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(mission.difficulty)}>{mission.difficulty}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mission.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {mission.progress}/{mission.maxProgress}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{mission.timeLimit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Trophy className="h-4 w-4" />
                    <span>{mission.reward} poin</span>
                  </div>
                </div>

                {isCompleted ? (
                  <Button disabled className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Selesai
                  </Button>
                ) : progress === 100 ? (
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => completeMission(mission.id)}
                  >
                    Klaim Reward
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full bg-transparent">
                    Mulai Misi
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
