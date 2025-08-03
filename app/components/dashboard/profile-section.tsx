"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Heart, Trophy, Target, Calendar, Edit } from "lucide-react"

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    bio: "Passionate about social impact and helping communities grow through technology and collaboration.",
    joinDate: "Januari 2024",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
  })

  const userStats = {
    totalDonations: 2450000,
    missionsCompleted: 23,
    impactScore: 8.4,
    rank: 6,
    badge: "Active Contributor",
    joinDate: "Januari 2024",
  }

  const achievements = [
    { id: 1, title: "First Donation", description: "Made your first donation", icon: Heart, earned: true },
    { id: 2, title: "Mission Master", description: "Completed 20 missions", icon: Target, earned: true },
    { id: 3, title: "Community Builder", description: "Invited 5 friends", icon: Trophy, earned: false },
    { id: 4, title: "Consistent Giver", description: "Donated for 30 days straight", icon: Calendar, earned: false },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profil Saya</h2>
        <p className="text-muted-foreground">Kelola profil dan pengaturan akun Anda</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="stats">Statistik</TabsTrigger>
          <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Profil
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Batal" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{profileData.name}</h3>
                  <Badge className="bg-indigo-500 text-white">Active Contributor</Badge>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Bergabung {profileData.joinDate}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Simpan Perubahan
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Batal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold">Rp {userStats.totalDonations.toLocaleString("id-ID")}</p>
                <p className="text-sm text-muted-foreground">Total Donasi</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{userStats.missionsCompleted}</p>
                <p className="text-sm text-muted-foreground">Misi Selesai</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold">#{userStats.rank}</p>
                <p className="text-sm text-muted-foreground">Ranking</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{userStats.impactScore}</p>
                <p className="text-sm text-muted-foreground">Impact Score</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle>Pencapaian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        achievement.earned
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && <Badge className="ml-auto bg-green-500 text-white">Earned</Badge>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(value) => handleNotificationChange("email", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi push</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(value) => handleNotificationChange("push", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi melalui SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(value) => handleNotificationChange("sms", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-notifications">Marketing Updates</Label>
                  <p className="text-sm text-muted-foreground">Terima update marketing dan promosi</p>
                </div>
                <Switch
                  id="marketing-notifications"
                  checked={notifications.marketing}
                  onCheckedChange={(value) => handleNotificationChange("marketing", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Ubah Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Aktifkan 2FA
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                Hapus Akun
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
