import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { useAdminStore } from "~/stores/admin-store"
import { Users, DollarSign, Building2, Clock, TrendingUp, AlertTriangle, Activity } from "lucide-react"

export function AdminOverview() {
  const { dashboardStats, systemStatus, recentLogs } = useAdminStore()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-600"
      case "warning":
        return "text-amber-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
              <Users className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 mb-2">{dashboardStats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+{dashboardStats.monthlyGrowth}% bulan ini</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Donations</CardTitle>
              <DollarSign className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {formatCurrency(dashboardStats.totalDonations)}
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18% bulan ini</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Active UMKM</CardTitle>
              <Building2 className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 mb-2">{dashboardStats.totalUMKM}</div>
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+23 bulan ini</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Approvals</CardTitle>
              <Clock className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 mb-2">{dashboardStats.pendingApprovals}</div>
            <div className="flex items-center gap-1 text-sm text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Perlu review</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Activity className="w-5 h-5 text-slate-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {systemStatus.map((status) => (
                <div
                  key={status.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    status.status === "healthy"
                      ? "bg-emerald-50 border-emerald-100"
                      : status.status === "warning"
                        ? "bg-amber-50 border-amber-100"
                        : "bg-red-50 border-red-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        status.status === "healthy"
                          ? "bg-emerald-500"
                          : status.status === "warning"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{status.name}</p>
                      <p className="text-xs text-slate-600">{status.details}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      status.status === "healthy"
                        ? "bg-emerald-100 text-emerald-700"
                        : status.status === "warning"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }
                  >
                    {status.status === "healthy" ? "Healthy" : status.status === "warning" ? "Warning" : "Error"}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">Overall System Health</p>
                  <p className="text-xs text-slate-500">{dashboardStats.systemHealth}%</p>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  Excellent
                </Badge>
              </div>
              <Progress value={dashboardStats.systemHealth} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Clock className="w-5 h-5 text-slate-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${getLogLevelColor(log.level).replace("text-", "bg-")}`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-800">{log.action}</p>
                      <span className="text-xs text-slate-500">{log.timestamp.split(" ")[1]}</span>
                    </div>
                    <p className="text-xs text-slate-600">{log.details}</p>
                    {log.user !== "System" && <p className="text-xs text-slate-500 mt-1">User: {log.user}</p>}
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
