"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SocialLogin } from "./social-login"
import { Link } from "react-router"
import { User, Mail, Lock, Phone, MapPin } from "lucide-react"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Lokasi harus diisi"
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to dashboard on success
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="backdrop-blur-sm bg-white/90 border-white/20 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Daftar Akun Baru
        </CardTitle>
        <p className="text-muted-foreground">Bergabunglah dengan komunitas social impact</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="pl-10"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
            {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+62 812-3456-7890"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Jakarta, Indonesia"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
              {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Minimal 8 karakter"
                className="pl-10"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              />
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              Saya menyetujui{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Syarat dan Ketentuan
              </Link>{" "}
              serta{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Kebijakan Privasi
              </Link>
            </Label>
          </div>
          {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Atau daftar dengan</span>
          </div>
        </div>

        <SocialLogin />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Masuk di sini
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
