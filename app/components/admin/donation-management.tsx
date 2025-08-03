"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Heart,
  Search,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  Calendar,
  User,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"

export function DonationManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const donations = [
    {
      id: "DON-001",
      donor: "Sarah Johnson",
      donorEmail: "sarah.johnson@email.com",
      amount: 250,
      cause: "Clean Water Project",
      status: "completed",
      method: "Credit Card",
      date: "2024-01-15",
      transactionId: "TXN-ABC123",
      fee: 7.5,
      netAmount: 242.5,
    },
    {
      id: "DON-002",
      donor: "Michael Chen",
      donorEmail: "michael.chen@email.com",
      amount: 100,
      cause: "Education for Children",
      status: "completed",
      method: "Bank Transfer",
      date: "2024-01-14",
      transactionId: "TXN-DEF456",
      fee: 2.0,
      netAmount: 98.0,
    },
    {
      id: "DON-003",
      donor: "Emma Rodriguez",
      donorEmail: "emma.rodriguez@email.com",
      amount: 500,
      cause: "Emergency Housing Relief",
      status: "pending",
      method: "Crypto Wallet",
      date: "2024-01-13",
      transactionId: "TXN-GHI789",
      fee: 15.0,
      netAmount: 485.0,
    },
    {
      id: "DON-004",
      donor: "David Kim",
      donorEmail: "david.kim@email.com",
      amount: 75,
      cause: "Food Security Program",
      status: "failed",
      method: "Credit Card",
      date: "2024-01-12",
      transactionId: "TXN-JKL012",
      fee: 0,
      netAmount: 0,
    },
    {
      id: "DON-005",
      donor: "Lisa Wang",
      donorEmail: "lisa.wang@email.com",
      amount: 300,
      cause: "Clean Water Project",
      status: "refunded",
      method: "PayPal",
      date: "2024-01-11",
      transactionId: "TXN-MNO345",
      fee: 9.0,
      netAmount: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || donation.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const donationStats = {
    total: donations.reduce((sum, d) => sum + (d.status === "completed" ? d.amount : 0), 0),
    count: donations.length,
    completed: donations.filter((d) => d.status === "completed").length,
    pending: donations.filter((d) => d.status === "pending").length,
    failed: donations.filter((d) => d.status === "failed").length,
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">${donationStats.total.toLocaleString()}</div>
            <div className="text-sm text-slate-300">Total Raised</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{donationStats.count}</div>
            <div className="text-sm text-slate-300">Total Donations</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{donationStats.completed}</div>
            <div className="text-sm text-slate-300">Completed</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <RefreshCw className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{donationStats.pending}</div>
            <div className="text-sm text-slate-300">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Management Table */}
      <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Heart className="h-5 w-5" />
            Donation Management
          </CardTitle>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search donations by donor, cause, or ID..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "bg-blue-600" : "border-white/20 text-white hover:bg-white/10"}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
                className={
                  filterStatus === "completed" ? "bg-green-600" : "border-white/20 text-white hover:bg-white/10"
                }
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
                className={
                  filterStatus === "pending" ? "bg-yellow-600" : "border-white/20 text-white hover:bg-white/10"
                }
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("failed")}
                className={filterStatus === "failed" ? "bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
              >
                Failed
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-slate-300">Donation ID</TableHead>
                  <TableHead className="text-slate-300">Donor</TableHead>
                  <TableHead className="text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">Cause</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Method</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="font-medium text-white">{donation.id}</div>
                      <div className="text-sm text-slate-400">{donation.transactionId}</div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-white">{donation.donor}</div>
                        <div className="text-sm text-slate-400">{donation.donorEmail}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-white">${donation.amount}</div>
                        {donation.status === "completed" && (
                          <div className="text-sm text-slate-400">
                            Net: ${donation.netAmount} (Fee: ${donation.fee})
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-white">{donation.cause}</div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-slate-300">{donation.method}</div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="h-4 w-4" />
                        {donation.date}
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem className="text-white hover:bg-slate-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">
                            <User className="h-4 w-4 mr-2" />
                            View Donor
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                          {donation.status === "pending" && (
                            <DropdownMenuItem className="text-green-400 hover:bg-slate-700">
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          {donation.status === "completed" && (
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Process Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
