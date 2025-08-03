"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Database,
  Server,
  Shield,
  Mail,
  Smartphone,
  Lock,
  AlertTriangle,
  CheckCircle,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
} from "lucide-react"

export function SystemManagement() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    twoFactorAuth: true,
    apiRateLimit: 1000,
    maxFileSize: 10,
    sessionTimeout: 30,
  })

  const systemHealth = {
    database: { status: "healthy", uptime: "99.9%", responseTime: "12ms" },
    api: { status: "healthy", uptime: "99.8%", responseTime: "45ms" },
    blockchain: { status: "healthy", uptime: "99.7%", responseTime: "234ms" },
    storage: { status: "warning", uptime: "98.5%", responseTime: "89ms" },
    email: { status: "healthy", uptime: "99.9%", responseTime: "156ms" },
  }

  const serverMetrics = {
    cpu: { usage: 45, cores: 8, temperature: 62 },
    memory: { usage: 68, total: 32, used: 21.8 },
    storage: { usage: 73, total: 1000, used: 730 },
    network: { inbound: 125, outbound: 89, latency: 12 },
  }

  const recentLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      level: "INFO",
      service: "API",
      message: "User authentication successful",
      user: "sarah.johnson@email.com",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:28:12",
      level: "WARNING",
      service: "Database",
      message: "High connection count detected",
      details: "95% of max connections in use",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:25:45",
      level: "ERROR",
      service: "Payment",
      message: "Payment gateway timeout",
      details: "Transaction ID: TXN-ABC123",
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:22:18",
      level: "INFO",
      service: "Blockchain",
      message: "Smart contract deployed successfully",
      details: "Contract address: 0x1234...5678",
    },
    {
      id: 5,
      timestamp: "2024-01-15 14:20:33",
      level: "INFO",
      service: "Email",
      message: "Donation confirmation sent",
      user: "michael.chen@email.com",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return <Activity className="h-5 w-5 text-gray-400" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "INFO":
        return "bg-blue-100 text-blue-800"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800"
      case "ERROR":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSettingChange = (key: string, value: boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Object.entries(systemHealth).map(([service, health]) => (
          <Card key={service} className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                {getStatusIcon(health.status)}
                <span className="ml-2 text-white font-medium capitalize">{service}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-slate-300">Uptime: {health.uptime}</div>
                <div className="text-slate-300">Response: {health.responseTime}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Server Metrics */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Server className="h-5 w-5" />
              Server Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-400" />
                    <span className="text-white">CPU Usage</span>
                  </div>
                  <span className="text-slate-300">{serverMetrics.cpu.usage}%</span>
                </div>
                <Progress value={serverMetrics.cpu.usage} className="h-2" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{serverMetrics.cpu.cores} cores</span>
                  <span>{serverMetrics.cpu.temperature}°C</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-green-400" />
                    <span className="text-white">Memory Usage</span>
                  </div>
                  <span className="text-slate-300">{serverMetrics.memory.usage}%</span>
                </div>
                <Progress value={serverMetrics.memory.usage} className="h-2" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{serverMetrics.memory.used}GB used</span>
                  <span>{serverMetrics.memory.total}GB total</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-purple-400" />
                    <span className="text-white">Storage Usage</span>
                  </div>
                  <span className="text-slate-300">{serverMetrics.storage.usage}%</span>
                </div>
                <Progress value={serverMetrics.storage.usage} className="h-2" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{serverMetrics.storage.used}GB used</span>
                  <span>{serverMetrics.storage.total}GB total</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-orange-400" />
                    <span className="text-white">Network Traffic</span>
                  </div>
                  <span className="text-slate-300">{serverMetrics.network.latency}ms</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>↓ {serverMetrics.network.inbound} MB/s</span>
                  <span>↑ {serverMetrics.network.outbound} MB/s</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Maintenance Mode</div>
                    <div className="text-sm text-slate-400">Disable user access for maintenance</div>
                  </div>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">User Registration</div>
                    <div className="text-sm text-slate-400">Allow new user registrations</div>
                  </div>
                </div>
                <Switch
                  checked={settings.userRegistration}
                  onCheckedChange={(checked) => handleSettingChange("userRegistration", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Email Notifications</div>
                    <div className="text-sm text-slate-400">Send email notifications to users</div>
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">SMS Notifications</div>
                    <div className="text-sm text-slate-400">Send SMS notifications to users</div>
                  </div>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-white font-medium">Auto Backup</div>
                    <div className="text-sm text-slate-400">Automatic daily database backups</div>
                  </div>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-red-400" />
                  <div>
                    <div className="text-white font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-slate-400">Require 2FA for admin accounts</div>
                  </div>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/20">
              <div>
                <label className="text-white font-medium mb-2 block">API Rate Limit (requests/hour)</label>
                <Input
                  type="number"
                  value={settings.apiRateLimit}
                  onChange={(e) => handleSettingChange("apiR ateLimit", Number.parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Max File Size (MB)</label>
                <Input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange("maxFileSize", Number.parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Session Timeout (minutes)</label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="h-5 w-5" />
            Recent System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Badge className={getLevelColor(log.level)}>{log.level}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{log.service}</span>
                    <span className="text-slate-400 text-sm">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-300 text-sm">{log.message}</div>
                  {log.details && <div className="text-slate-400 text-xs mt-1">{log.details}</div>}
                  {log.user && <div className="text-blue-400 text-xs mt-1">User: {log.user}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View All Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
