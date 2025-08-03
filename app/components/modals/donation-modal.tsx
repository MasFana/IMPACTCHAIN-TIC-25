"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, CreditCard, Wallet, Building } from "lucide-react"

interface DonationModalProps {
  cause: {
    id: number
    title: string
    description: string
    image: string
  }
  isOpen: boolean
  onClose: () => void
}

export function DonationModal({ cause, isOpen, onClose }: DonationModalProps) {
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [message, setMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const predefinedAmounts = [50000, 100000, 250000, 500000, 1000000]

  const handleAmountSelect = (value: string) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setAmount("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const donationAmount = amount || customAmount
    if (!donationAmount || Number.parseInt(donationAmount) < 10000) {
      alert("Minimal donasi Rp 10.000")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      alert(
        `Terima kasih! Donasi sebesar Rp ${Number.parseInt(donationAmount).toLocaleString("id-ID")} berhasil dikirim.`,
      )
      onClose()
    } catch (error) {
      alert("Donasi gagal. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setAmount("")
    setCustomAmount("")
    setMessage("")
    setIsAnonymous(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Donasi untuk {cause.title}
          </DialogTitle>
          <DialogDescription>{cause.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-3">
            <Label>Pilih Jumlah Donasi</Label>
            <div className="grid grid-cols-2 gap-2">
              {predefinedAmounts.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={amount === value.toString() ? "default" : "outline"}
                  className="h-12"
                  onClick={() => handleAmountSelect(value.toString())}
                >
                  Rp {value.toLocaleString("id-ID")}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount">Atau masukkan jumlah lain</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Minimal Rp 10.000"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Metode Pembayaran</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Kartu Kredit/Debit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="e-wallet" id="e-wallet" />
                <Label htmlFor="e-wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  E-Wallet (GoPay, OVO, DANA)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                <Label htmlFor="bank-transfer" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Transfer Bank
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Pesan (Opsional)</Label>
            <Textarea
              id="message"
              placeholder="Tulis pesan dukungan Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="anonymous">Donasi sebagai anonim</Label>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Jumlah Donasi:</span>
              <span className="font-medium">
                Rp {(amount || customAmount || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Admin:</span>
              <span className="font-medium">Gratis</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>Rp {(amount || customAmount || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-2">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              disabled={isLoading || (!amount && !customAmount)}
            >
              {isLoading ? "Memproses..." : "Donasi Sekarang"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
