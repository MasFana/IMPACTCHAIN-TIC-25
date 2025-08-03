import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Shield, Database, Bell } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">ImpactChain Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <Database className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">System Health: 98.5%</span>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                Online
              </Badge>
            </div>

            <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-slate-800">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>

            <Avatar className="ring-2 ring-slate-200 ring-offset-2">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-slate-600 text-white">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
