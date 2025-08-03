"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Store, MapPin, Star, Users, TrendingUp, Plus } from "lucide-react"

export function UMKMSection() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const umkmList = [
    {
      id: 1,
      name: "Warung Makan Bu Sari",
      category: "Kuliner",
      location: "Jakarta Selatan",
      description: "Warung makan tradisional dengan menu masakan Padang autentik",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      supporters: 156,
      fundingGoal: 15000000,
      currentFunding: 8500000,
      status: "active",
    },
    {
      id: 2,
      name: "Kerajinan Bambu Pak Joko",
      category: "Kerajinan",
      location: "Yogyakarta",
      description: "Produksi kerajinan bambu ramah lingkungan untuk dekorasi rumah",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      supporters: 89,
      fundingGoal: 10000000,
      currentFunding: 6200000,
      status: "active",
    },
    {
      id: 3,
      name: "Toko Kain Tenun Ibu Ani",
      category: "Fashion",
      location: "Bali",
      description: "Kain tenun tradisional Bali dengan motif dan kualitas terbaik",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      supporters: 203,
      fundingGoal: 20000000,
      currentFunding: 18500000,
      status: "almost_funded",
    },
    {
      id: 4,
      name: "Kopi Arabika Petani Lokal",
      category: "Minuman",
      location: "Aceh",
      description: "Kopi arabika premium langsung dari petani lokal Gayo",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      supporters: 124,
      fundingGoal: 12000000,
      currentFunding: 4800000,
      status: "active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "almost_funded":
        return "bg-green-100 text-green-800"
      case "funded":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "almost_funded":
        return "Hampir Terpenuhi"
      case "funded":
        return "Terpenuhi"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Support UMKM Lokal</h2>
          <p className="text-muted-foreground">Dukung usaha mikro, kecil, dan menengah di Indonesia</p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          onClick={() => setShowApplicationForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Daftar UMKM
        </Button>
      </div>

      {/* UMKM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <Store className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">127</p>
            <p className="text-sm text-muted-foreground">UMKM Terdaftar</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Total Supporter</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">Rp 2.1M</p>
            <p className="text-sm text-muted-foreground">Total Funding</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">4.7</p>
            <p className="text-sm text-muted-foreground">Rata-rata Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* UMKM List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {umkmList.map((umkm) => {
          const progress = (umkm.currentFunding / umkm.fundingGoal) * 100

          return (
            <Card
              key={umkm.id}
              className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img src={umkm.image || "/placeholder.svg"} alt={umkm.name} className="w-full h-48 object-cover" />
                <Badge className={`absolute top-3 left-3 ${getStatusColor(umkm.status)}`}>
                  {getStatusText(umkm.status)}
                </Badge>
                <Badge variant="secondary" className="absolute top-3 right-3">
                  {umkm.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{umkm.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{umkm.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{umkm.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{umkm.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{umkm.supporters} supporters</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span className="font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Rp {umkm.currentFunding.toLocaleString("id-ID")}</span>
                      <span>Target: Rp {umkm.fundingGoal.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Support
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Detail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md backdrop-blur-sm bg-white/95">
            <CardHeader>
              <CardTitle>Daftar UMKM Anda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Nama Usaha" />
              <Input placeholder="Kategori Usaha" />
              <Input placeholder="Lokasi" />
              <Textarea placeholder="Deskripsi Usaha" />
              <Input placeholder="Target Funding (Rp)" type="number" />

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Daftar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
