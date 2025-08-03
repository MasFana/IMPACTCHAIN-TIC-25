"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Calendar, MapPin } from "lucide-react"
import { DonationModal } from "~/components/modals/donation-modal"

export function DonationSection() {
  const [selectedCause, setSelectedCause] = useState<any>(null)
  const [showDonationModal, setShowDonationModal] = useState(false)

  const causes = [
    {
      id: 1,
      title: "Pendidikan Anak Kurang Mampu",
      description: "Membantu anak-anak kurang mampu mendapatkan akses pendidikan yang layak",
      image: "/placeholder.svg?height=200&width=300",
      raised: 15750000,
      target: 25000000,
      donors: 234,
      daysLeft: 15,
      location: "Jakarta, Indonesia",
      category: "Pendidikan",
      urgent: true,
    },
    {
      id: 2,
      title: "Bantuan Korban Bencana Alam",
      description: "Memberikan bantuan darurat untuk korban bencana alam di daerah terpencil",
      image: "/placeholder.svg?height=200&width=300",
      raised: 8500000,
      target: 15000000,
      donors: 156,
      daysLeft: 8,
      location: "Sulawesi Tengah",
      category: "Kemanusiaan",
      urgent: true,
    },
    {
      id: 3,
      title: "Program Kesehatan Ibu dan Anak",
      description: "Meningkatkan akses layanan kesehatan untuk ibu dan anak di desa terpencil",
      image: "/placeholder.svg?height=200&width=300",
      raised: 12300000,
      target: 20000000,
      donors: 189,
      daysLeft: 22,
      location: "Papua Barat",
      category: "Kesehatan",
      urgent: false,
    },
    {
      id: 4,
      title: "Pemberdayaan UMKM Lokal",
      description: "Membantu UMKM lokal mengembangkan usaha dan meningkatkan ekonomi masyarakat",
      image: "/placeholder.svg?height=200&width=300",
      raised: 6750000,
      target: 12000000,
      donors: 98,
      daysLeft: 30,
      location: "Yogyakarta",
      category: "Ekonomi",
      urgent: false,
    },
  ]

  const handleDonate = (cause: any) => {
    setSelectedCause(cause)
    setShowDonationModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Program Donasi</h2>
          <p className="text-muted-foreground">Pilih program donasi yang ingin Anda dukung</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {causes.length} Program Aktif
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {causes.map((cause) => {
          const progress = (cause.raised / cause.target) * 100

          return (
            <Card
              key={cause.id}
              className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img src={cause.image || "/placeholder.svg"} alt={cause.title} className="w-full h-48 object-cover" />
                {cause.urgent && <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">Mendesak</Badge>}
                <Badge variant="secondary" className="absolute top-3 right-3">
                  {cause.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{cause.title}</h3>
                    <p className="text-sm text-muted-foreground">{cause.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Terkumpul</span>
                      <span className="font-medium">Rp {cause.raised.toLocaleString("id-ID")}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(1)}% tercapai</span>
                      <span>Target: Rp {cause.target.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{cause.donors} donatur</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{cause.daysLeft} hari lagi</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{cause.location}</span>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => handleDonate(cause)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donasi Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {showDonationModal && selectedCause && (
        <DonationModal cause={selectedCause} isOpen={showDonationModal} onClose={() => setShowDonationModal(false)} />
      )}
    </div>
  )
}
