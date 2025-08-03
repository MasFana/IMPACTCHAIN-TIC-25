"use client"

import type React from "react"

import { Header } from "~/components/common/header"
import { NotificationPanel } from "~/components/common/notification-panel"
import { BackgroundPattern } from "~/components/common/background-pattern"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Heart, Target, Store, Trophy, User } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
}

const DashboardLayout = ({ children, activeTab, setActiveTab }: DashboardLayoutProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "donations", label: "Donasi", icon: Heart },
    { id: "missions", label: "Misi", icon: Target },
    { id: "umkm", label: "UMKM", icon: Store },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profil", icon: User },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <BackgroundPattern />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <Card className="p-4 backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "hover:bg-white/50"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </Button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>

          {/* Notification Panel */}
          <div className="lg:w-80">
            <NotificationPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
