"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, CheckCircle } from "lucide-react"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email harus diisi")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Format email tidak valid")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (error) {
      setError("Gagal mengirim email reset password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEmail("")
    setError("")
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isSuccess ? "Email Terkirim" : "Reset Password"}</DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Kami telah mengirim link reset password ke email Anda"
              : "Masukkan email Anda untuk menerima link reset password"}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center space-y-4 py-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-center text-sm text-muted-foreground">
              Silakan cek email Anda dan ikuti instruksi untuk reset password
            </p>
            <Button onClick={handleClose} className="w-full">
              Tutup
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="nama@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Mengirim..." : "Kirim Link Reset"}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Batal
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
