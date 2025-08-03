"use client"

import { useState } from "react"
import { AdminLayout } from "~/components/layouts/admin-layout"
import { AdminOverview } from "~/components/admin/admin-overview"
import { UserManagement } from "~/components/admin/user-management"
import { DonationManagement } from "~/components/admin/donation-management"
import { UMKMManagement } from "~/components/admin/umkm-management"
import { SystemManagement } from "~/components/admin/system-management"
import { ReportsSection } from "~/components/admin/reports-section"

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />
      case "users":
        return <UserManagement />
      case "donations":
        return <DonationManagement />
      case "umkm":
        return <UMKMManagement />
      case "system":
        return <SystemManagement />
      case "reports":
        return <ReportsSection />
      default:
        return <AdminOverview />
    }
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  )
}
