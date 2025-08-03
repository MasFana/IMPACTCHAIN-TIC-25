"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Heart,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Github,
  Chrome,
  Facebook,
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [isResetEmailSent, setIsResetEmailSent] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    location: "",
    agreeToTerms: false,
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    // Register-specific validations
    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = "Nama lengkap wajib diisi"
      }

      if (!formData.phone) {
        newErrors.phone = "Nomor telepon wajib diisi"
      }

      if (!formData.location) {
        newErrors.location = "Lokasi wajib diisi"
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password wajib diisi"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Password tidak cocok"
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)

    // Redirect to dashboard (in real app, handle authentication)
    window.location.href = "/"
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: "Masukkan email terlebih dahulu" })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsResetEmailSent(true)
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`)
    // Implement social login logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">ImpactChain</h1>
              <p className="text-xs text-slate-500">Blockchain Social Impact</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            {isLogin ? "Selamat Datang Kembali" : "Bergabung dengan Kami"}
          </h2>
          <p className="text-slate-600 text-sm">
            {isLogin
              ? "Masuk ke akun Anda untuk melanjutkan membuat dampak positif"
              : "Mulai perjalanan Anda dalam menciptakan dampak sosial yang berkelanjutan"}
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-slate-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-center space-x-1 mb-4">
              <Button
                variant={isLogin ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsLogin(true)}
                className={isLogin ? "bg-slate-800 hover:bg-slate-700" : "text-slate-600"}
              >
                Masuk
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsLogin(false)}
                className={!isLogin ? "bg-slate-800 hover:bg-slate-700" : "text-slate-600"}
              >
                Daftar
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Register Fields */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-700">
                      Nama Lengkap
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`pl-10 border-slate-200 ${errors.fullName ? "border-red-300" : ""}`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700">
                        Nomor Telepon
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+62 812-3456-7890"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`pl-10 border-slate-200 ${errors.phone ? "border-red-300" : ""}`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-slate-700">
                        Lokasi
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="location"
                          type="text"
                          placeholder="Jakarta, Indonesia"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className={`pl-10 border-slate-200 ${errors.location ? "border-red-300" : ""}`}
                        />
                      </div>
                      {errors.location && <p className="text-xs text-red-600">{errors.location}</p>}
                    </div>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 border-slate-200 ${errors.email ? "border-red-300" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 border-slate-200 ${errors.password ? "border-red-300" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field (Register only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700">
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 border-slate-200 ${errors.confirmPassword ? "border-red-300" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me / Terms */}
              <div className="flex items-center justify-between">
                {isLogin ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-slate-600">
                      Ingat saya
                    </Label>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                      className={errors.agreeToTerms ? "border-red-300" : ""}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-slate-600 leading-relaxed">
                      Saya menyetujui{" "}
                      <Link href="/terms" className="text-slate-800 hover:underline font-medium">
                        Syarat & Ketentuan
                      </Link>{" "}
                      dan{" "}
                      <Link href="/privacy" className="text-slate-800 hover:underline font-medium">
                        Kebijakan Privasi
                      </Link>
                    </Label>
                  </div>
                )}

                {isLogin && (
                  <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-sm text-slate-600 hover:text-slate-800 p-0">
                        Lupa password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          {isResetEmailSent
                            ? "Email reset password telah dikirim ke alamat email Anda."
                            : "Masukkan email Anda untuk menerima link reset password."}
                        </DialogDescription>
                      </DialogHeader>
                      {!isResetEmailSent ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="resetEmail">Email</Label>
                            <Input
                              id="resetEmail"
                              type="email"
                              placeholder="nama@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsForgotPasswordOpen(false)} className="flex-1">
                              Batal
                            </Button>
                            <Button
                              onClick={handleForgotPassword}
                              disabled={isLoading}
                              className="flex-1 bg-slate-800 hover:bg-slate-700"
                            >
                              {isLoading ? (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                  Mengirim...
                                </>
                              ) : (
                                "Kirim Link"
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center p-4 bg-emerald-50 rounded-lg">
                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                          </div>
                          <p className="text-center text-sm text-slate-600">
                            Silakan cek email Anda dan ikuti instruksi untuk reset password.
                          </p>
                          <Button
                            onClick={() => {
                              setIsForgotPasswordOpen(false)
                              setIsResetEmailSent(false)
                            }}
                            className="w-full bg-slate-800 hover:bg-slate-700"
                          >
                            Tutup
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {errors.agreeToTerms && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{errors.agreeToTerms}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? "Masuk..." : "Mendaftar..."}
                  </>
                ) : (
                  <>{isLogin ? "Masuk" : "Daftar"}</>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Atau</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                className="border-slate-200 hover:bg-slate-50"
              >
                <Chrome className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("facebook")}
                className="border-slate-200 hover:bg-slate-50"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("github")}
                className="border-slate-200 hover:bg-slate-50"
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>

            {/* Footer Text */}
            <div className="text-center text-sm text-slate-600">
              {isLogin ? (
                <>
                  Belum punya akun?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(false)}
                    className="text-slate-800 hover:underline p-0 font-medium"
                  >
                    Daftar sekarang
                  </Button>
                </>
              ) : (
                <>
                  Sudah punya akun?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(true)}
                    className="text-slate-800 hover:underline p-0 font-medium"
                  >
                    Masuk di sini
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Data Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
