"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  MoreHorizontal,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+62 812-3456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      role: "user",
      joinDate: "2023-01-15",
      lastActive: "2 hours ago",
      totalDonations: 2450,
      missionsCompleted: 23,
      impactPoints: 2847,
      location: "Jakarta, Indonesia",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+62 813-2345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      role: "moderator",
      joinDate: "2023-02-20",
      lastActive: "1 day ago",
      totalDonations: 1800,
      missionsCompleted: 28,
      impactPoints: 2634,
      location: "Surabaya, Indonesia",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.rodriguez@email.com",
      phone: "+62 814-3456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "suspended",
      role: "user",
      joinDate: "2023-03-10",
      lastActive: "1 week ago",
      totalDonations: 3200,
      missionsCompleted: 19,
      impactPoints: 2456,
      location: "Bandung, Indonesia",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+62 815-4567-8901",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "inactive",
      role: "user",
      joinDate: "2023-04-05",
      lastActive: "2 weeks ago",
      totalDonations: 950,
      missionsCompleted: 31,
      impactPoints: 2234,
      location: "Yogyakarta, Indonesia",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+62 816-5678-9012",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      role: "admin",
      joinDate: "2022-12-01",
      lastActive: "30 minutes ago",
      totalDonations: 5600,
      missionsCompleted: 16,
      impactPoints: 2156,
      location: "Medan, Indonesia",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.total}</div>
            <div className="text-sm text-slate-300">Total Users</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <UserCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.active}</div>
            <div className="text-sm text-slate-300">Active Users</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.inactive}</div>
            <div className="text-sm text-slate-300">Inactive Users</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.suspended}</div>
            <div className="text-sm text-slate-300">Suspended Users</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "bg-blue-600" : "border-white/20 text-white hover:bg-white/10"}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
                className={filterStatus === "active" ? "bg-green-600" : "border-white/20 text-white hover:bg-white/10"}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("inactive")}
                className={
                  filterStatus === "inactive" ? "bg-yellow-600" : "border-white/20 text-white hover:bg-white/10"
                }
              >
                Inactive
              </Button>
              <Button
                variant={filterStatus === "suspended" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("suspended")}
                className={filterStatus === "suspended" ? "bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
              >
                Suspended
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-slate-300">User</TableHead>
                  <TableHead className="text-slate-300">Contact</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Role</TableHead>
                  <TableHead className="text-slate-300">Activity</TableHead>
                  <TableHead className="text-slate-300">Impact</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-white/20 text-white">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-slate-400">{user.location}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>

                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Calendar className="h-3 w-3" />
                          Joined {user.joinDate}
                        </div>
                        <div className="text-sm text-slate-400">Last active: {user.lastActive}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="text-white">{user.impactPoints} points</div>
                        <div className="text-slate-400">${user.totalDonations} donated</div>
                        <div className="text-slate-400">{user.missionsCompleted} missions</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem className="text-white hover:bg-slate-700">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">Edit User</DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-400 hover:bg-slate-700">
                              Activate User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
