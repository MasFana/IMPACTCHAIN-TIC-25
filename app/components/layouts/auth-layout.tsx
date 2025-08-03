import type React from "react"
import { BackgroundPattern } from "~/components/common/background-pattern"
import { AuthHeader } from "~/components/auth/auth-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <BackgroundPattern />
      <AuthHeader />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
