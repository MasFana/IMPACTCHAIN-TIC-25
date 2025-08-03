"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, TrendingUp, Users, Heart, Building2, DollarSign, FileText, RefreshCw } from "lucide-react"

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("last_30_days")
  const [selectedReport, setSelectedReport] = useState("overview")

  const reportData = {
    overview: {
      totalUsers: 1247,
      activeUsers: 892,
      totalDonations: 156780,
      donationCount: 2341,
      umkmSupported: 89,
      missionsCompleted: 1567,
      impactPoints: 234567,
    },
    donations: {
      byCategory: [
        { category: "Clean Water", amount: 45600, count: 234, percentage: 29 },
        { category: "Education", amount: 38900, count: 189, percentage: 25 },
        { category: "Emergency Relief", amount: 32400, count: 156, percentage: 21 },
        { category: "Food Security", amount: 25600, count: 123, percentage: 16 },
        { category: "Healthcare", amount: 14280, count: 89, percentage: 9 },
      ],
      byMonth: [
        { month: "Jan", amount: 12500, count: 145 },
        { month: "Feb", amount: 15600, count: 178 },
        { month: "Mar", amount: 18900, count: 203 },
        { month: "Apr", amount: 22100, count: 234 },
        { month: "May", amount: 19800, count: 221 },
      ],
    },
    users: {
      registrations: [
        { month: "Jan", count: 89 },
        { month: "Feb", count: 124 },
        { month: "Mar", count: 156 },
        { month: "Apr", count: 178 },
        { month: "May", count: 203 },
      ],
      engagement: {
        dailyActive: 456,
        weeklyActive: 892,
        monthlyActive: 1247,
        averageSession: "12m 34s",
      },
    },
    umkm: {
      applications: [
        { status: "Approved", count: 45, percentage: 51 },
        { status: "Pending", count: 23, percentage: 26 },
        { status: "Under Review", count: 12, percentage: 13 },
        { status: "Rejected", count: 9, percentage: 10 },
      ],
      funding: {
        totalRaised: 234500,
        averageGoal: 18600,
        successRate: 67,
      },
    },
  }

  const availableReports = [
    { id: "overview", name: "Platform Overview", icon: BarChart3 },
    { id: "donations", name: "Donation Analytics", icon: Heart },
    { id: "users", name: "User Analytics", icon: Users },
    { id: "umkm", name: "UMKM Analytics", icon: Building2 },
    { id: "financial", name: "Financial Report", icon: DollarSign },
    { id: "impact", name: "Impact Report", icon: TrendingUp },
  ]

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`)
    // Handle report generation logic
  }

  const exportReport = (format: string) => {
    console.log(`Exporting ${selectedReport} report as ${format}`)
    // Handle export logic
  }

  return (
    <div className="space-y-8">
      {/* Report Controls */}
      <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5" />
            Reports & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-white font-medium mb-2 block">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {availableReports.map((report) => {
                    const Icon = report.icon
                    return (
                      <SelectItem key={report.id} value={report.id} className="text-white hover:bg-slate-700">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {report.name}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-white font-medium mb-2 block">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="last_7_days" className="text-white hover:bg-slate-700">
                    Last 7 Days
                  </SelectItem>
                  <SelectItem value="last_30_days" className="text-white hover:bg-slate-700">
                    Last 30 Days
                  </SelectItem>
                  <SelectItem value="last_3_months" className="text-white hover:bg-slate-700">
                    Last 3 Months
                  </SelectItem>
                  <SelectItem value="last_6_months" className="text-white hover:bg-slate-700">
                    Last 6 Months
                  </SelectItem>
                  <SelectItem value="last_year" className="text-white hover:bg-slate-700">
                    Last Year
                  </SelectItem>
                  <SelectItem value="custom" className="text-white hover:bg-slate-700">
                    Custom Range
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 items-end">
              <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate
              </Button>
              <Button
                variant="outline"
                onClick={() => exportReport("pdf")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Report */}
      {selectedReport === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{reportData.overview.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-slate-300">Total Users</div>
                <div className="text-xs text-green-400 mt-1">+12% from last period</div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${reportData.overview.totalDonations.toLocaleString()}
                </div>
                <div className="text-sm text-slate-300">Total Donations</div>
                <div className="text-xs text-green-400 mt-1">+18% from last period</div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Building2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{reportData.overview.umkmSupported}</div>
                <div className="text-sm text-slate-300">UMKM Supported</div>
                <div className="text-xs text-green-400 mt-1">+25% from last period</div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{reportData.overview.impactPoints.toLocaleString()}</div>
                <div className="text-sm text-slate-300">Impact Points</div>
                <div className="text-xs text-green-400 mt-1">+15% from last period</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Donations Report */}
      {selectedReport === "donations" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Donations by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.donations.byCategory.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{category.category}</span>
                        <span className="text-slate-300">${category.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{category.count} donations</span>
                        <span>{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Monthly Donation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.donations.byMonth.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <div className="text-white font-medium">{month.month}</div>
                        <div className="text-sm text-slate-400">{month.count} donations</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">${month.amount.toLocaleString()}</div>
                        <div className="text-xs text-green-400">+{Math.floor(Math.random() * 20)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Users Report */}
      {selectedReport === "users" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">User Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.users.registrations.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white">{month.month}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${(month.count / 250) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium w-12 text-right">{month.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{reportData.users.engagement.dailyActive}</div>
                    <div className="text-slate-300">Daily Active Users</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <div className="text-xl font-bold text-white">{reportData.users.engagement.weeklyActive}</div>
                      <div className="text-sm text-slate-400">Weekly Active</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <div className="text-xl font-bold text-white">{reportData.users.engagement.monthlyActive}</div>
                      <div className="text-sm text-slate-400">Monthly Active</div>
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-white">{reportData.users.engagement.averageSession}</div>
                    <div className="text-sm text-slate-400">Average Session Duration</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* UMKM Report */}
      {selectedReport === "umkm" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.umkm.applications.map((status, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{status.status}</span>
                        <span className="text-slate-300">{status.count} applications</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                          style={{ width: `${status.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-400 text-right">{status.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Funding Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      ${reportData.umkm.funding.totalRaised.toLocaleString()}
                    </div>
                    <div className="text-slate-300">Total Funding Raised</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <div className="text-xl font-bold text-white">
                        ${reportData.umkm.funding.averageGoal.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-400">Average Goal</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <div className="text-xl font-bold text-white">{reportData.umkm.funding.successRate}%</div>
                      <div className="text-sm text-slate-400">Success Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Export Options */}
      <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="h-5 w-5" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => exportReport("pdf")} className="bg-red-600 hover:bg-red-700">
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button onClick={() => exportReport("excel")} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Export as Excel
            </Button>
            <Button onClick={() => exportReport("csv")} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button
              onClick={() => exportReport("json")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
