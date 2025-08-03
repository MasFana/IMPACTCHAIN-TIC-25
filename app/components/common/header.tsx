import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, User, LogOut } from "lucide-react"
import { Link } from "react-router"

export function Header() {
  return (
    <Card className="m-4 backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TIC Impact Chain
            </h1>
            <p className="text-sm text-muted-foreground">Social Impact Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/login">
              <LogOut className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
