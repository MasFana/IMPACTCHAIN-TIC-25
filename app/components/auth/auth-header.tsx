import { Link } from "react-router"

export function AuthHeader() {
  return (
    <div className="flex items-center justify-center p-6">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TIC Impact Chain
          </h1>
          <p className="text-sm text-muted-foreground">Social Impact Platform</p>
        </div>
      </Link>
    </div>
  )
}
