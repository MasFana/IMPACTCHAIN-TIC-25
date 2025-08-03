"use client"

import type React from "react"
import { BackgroundPattern } from "~/components/common/background-pattern"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LayoutDashboard, Users, Heart, Store, Settings, BarChart3, Shield } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
}

const AdminLayout = ({ children, activeTab, setActiveTab }: AdminLayoutProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "donations", label: "Donations", icon: Heart },
    { id: "umkm", label: "UMKM", icon: Store },
    { id: "system", label: "System", icon: Settings },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      <BackgroundPattern />

      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="container mx-auto flex items-center gap-3">
          <Shield className="h-6 w-6" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Admin Sidebar */}
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
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
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

          {/* Admin Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
