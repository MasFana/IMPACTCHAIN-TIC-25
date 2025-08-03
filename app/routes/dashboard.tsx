"use client"

import { useState } from "react"
import { DashboardLayout } from "~/components/layouts/dashboard-layout"
import { DashboardOverview } from "~/components/dashboard/dashboard-overview"
import { DonationSection } from "~/components/dashboard/donation-section"
import { MissionsSection } from "~/components/dashboard/missions-section"
import { UMKMSection } from "~/components/dashboard/umkm-section"
import { LeaderboardSection } from "~/components/dashboard/leaderboard-section"
import { ProfileSection } from "~/components/dashboard/profile-section"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "donations":
        return <DonationSection />
      case "missions":
        return <MissionsSection />
      case "umkm":
        return <UMKMSection />
      case "leaderboard":
        return <LeaderboardSection />
      case "profile":
        return <ProfileSection />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
