"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Building2, Search, MoreHorizontal, Eye, Check, X, Clock, MapPin, Phone, Users } from "lucide-react"

export function UmkmManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  const applications = [
    {
      id: "UMKM-001",
      businessName: "Warung Kopi Nusantara",
      owner: "Ibu Sari",
      email: "sari@warungkopi.com",
      phone: "+62 812-3456-7890",
      location: "Yogyakarta, Indonesia",
      category: "Food & Beverage",
      fundingGoal: 15000,
      fundingRaised: 8500,
      supporters: 45,
      status: "approved",
      submissionDate: "2024-01-10",
      approvalDate: "2024-01-15",
      description: "Traditional Indonesian coffee shop serving authentic local coffee and snacks.",
      businessPlan: "Expand seating area and add traditional food menu to attract more customers.",
      impact: "Employs 8 local community members and supports local coffee farmers.",
      documents: ["business_license.pdf", "financial_plan.xlsx", "photos.zip"],
    },
    {
      id: "UMKM-002",
      businessName: "Batik Indah Craft",
      owner: "Pak Bambang",
      email: "bambang@batikindah.com",
      phone: "+62 813-2345-6789",
      location: "Solo, Central Java",
      category: "Arts & Crafts",
      fundingGoal: 20000,
      fundingRaised: 0,
      supporters: 0,
      status: "pending",
      submissionDate: "2024-01-12",
      approvalDate: null,
      description: "Handmade batik products created by skilled local artisans using traditional techniques.",
      businessPlan: "Purchase modern equipment while maintaining traditional methods to increase production.",
      impact: "Preserves cultural heritage and provides income for 15 local artisans.",
      documents: ["business_license.pdf", "artisan_certificates.pdf", "product_catalog.pdf"],
    },
    {
      id: "UMKM-003",
      businessName: "Organic Farm Fresh",
      owner: "Pak Joko",
      email: "joko@organicfarm.com",
      phone: "+62 814-3456-7890",
      location: "Bandung, West Java",
      category: "Agriculture",
      fundingGoal: 25000,
      fundingRaised: 0,
      supporters: 0,
      status: "rejected",
      submissionDate: "2024-01-08",
      approvalDate: "2024-01-14",
      description: "Sustainable organic farming producing fresh vegetables and herbs for local markets.",
      businessPlan: "Expand greenhouse facilities and implement modern irrigation systems.",
      impact: "Supplies healthy food to 200+ families and promotes sustainable agriculture.",
      documents: ["business_license.pdf", "land_certificate.pdf", "organic_certification.pdf"],
      rejectionReason: "Incomplete financial documentation and unclear market analysis.",
    },
    {
      id: "UMKM-004",
      businessName: "Kerajinan Bambu Lestari",
      owner: "Ibu Dewi",
      email: "dewi@bambulestari.com",
      phone: "+62 815-4567-8901",
      location: "Bali, Indonesia",
      category: "Handicrafts",
      fundingGoal: 12000,
      fundingRaised: 0,
      supporters: 0,
      status: "under_review",
      submissionDate: "2024-01-14",
      approvalDate: null,
      description: "Eco-friendly bamboo handicrafts and furniture made by local craftsmen.",
      businessPlan: "Develop online sales platform and expand product line to international markets.",
      impact: "Promotes sustainable materials and supports 12 local craftsmen families.",
      documents: ["business_license.pdf", "product_samples.zip", "market_research.pdf"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const applicationStats = {
    total: applications.length,
    approved: applications.filter((a) => a.status === "approved").length,
    pending: applications.filter((a) => a.status === "pending").length,
    underReview: applications.filter((a) => a.status === "under_review").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  const handleApprove = (applicationId: string) => {
    console.log("Approving application:", applicationId)
    // Handle approval logic
  }

  const handleReject = (applicationId: string, reason: string) => {
    console.log("Rejecting application:", applicationId, "Reason:", reason)
    // Handle rejection logic
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <Building2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{applicationStats.total}</div>
            <div className="text-sm text-slate-300">Total Applications</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{applicationStats.approved}</div>
            <div className="text-sm text-slate-300">Approved</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{applicationStats.pending}</div>
            <div className="text-sm text-slate-300">Pending</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{applicationStats.underReview}</div>
            <div className="text-sm text-slate-300">Under Review</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardContent className="p-6 text-center">
            <X className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{applicationStats.rejected}</div>
            <div className="text-sm text-slate-300">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* UMKM Management Table */}
      <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Building2 className="h-5 w-5" />
            UMKM Applications
          </CardTitle>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by business name, owner, or category..."
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
                variant={filterStatus === "under_review" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("under_review")}
                className={
                  filterStatus === "under_review" ? "bg-blue-600" : "border-white/20 text-white hover:bg-white/10"
                }
              >
                Under Review
              </Button>
              <Button
                variant={filterStatus === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("approved")}
                className={
                  filterStatus === "approved" ? "bg-green-600" : "border-white/20 text-white hover:bg-white/10"
                }
              >
                Approved
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-slate-300">Business</TableHead>
                  <TableHead className="text-slate-300">Owner</TableHead>
                  <TableHead className="text-slate-300">Category</TableHead>
                  <TableHead className="text-slate-300">Funding</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Submission Date</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-white">{application.businessName}</div>
                        <div className="text-sm text-slate-400">{application.id}</div>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <MapPin className="h-3 w-3" />
                          {application.location}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-white">{application.owner}</div>
                        <div className="text-sm text-slate-400">{application.email}</div>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Phone className="h-3 w-3" />
                          {application.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {application.category}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-white">${application.fundingGoal.toLocaleString()}</div>
                        {application.status === "approved" && (
                          <div className="text-sm text-slate-400">
                            Raised: ${application.fundingRaised.toLocaleString()}
                          </div>
                        )}
                        {application.supporters > 0 && (
                          <div className="flex items-center gap-1 text-sm text-slate-400">
                            <Users className="h-3 w-3" />
                            {application.supporters} supporters
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-slate-300">{application.submissionDate}</div>
                      {application.approvalDate && (
                        <div className="text-sm text-slate-400">Approved: {application.approvalDate}</div>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
                            <DialogHeader>
                              <DialogTitle className="text-white">
                                {selectedApplication?.businessName} - Application Details
                              </DialogTitle>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-6 text-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Business Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div>
                                          <strong>Name:</strong> {selectedApplication.businessName}
                                        </div>
                                        <div>
                                          <strong>Owner:</strong> {selectedApplication.owner}
                                        </div>
                                        <div>
                                          <strong>Category:</strong> {selectedApplication.category}
                                        </div>
                                        <div>
                                          <strong>Location:</strong> {selectedApplication.location}
                                        </div>
                                        <div>
                                          <strong>Funding Goal:</strong> $
                                          {selectedApplication.fundingGoal.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Contact Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div>
                                          <strong>Email:</strong> {selectedApplication.email}
                                        </div>
                                        <div>
                                          <strong>Phone:</strong> {selectedApplication.phone}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Application Status</h4>
                                      <div className="space-y-2 text-sm">
                                        <div>
                                          <strong>Status:</strong>
                                          <Badge className={`ml-2 ${getStatusColor(selectedApplication.status)}`}>
                                            {selectedApplication.status.replace("_", " ")}
                                          </Badge>
                                        </div>
                                        <div>
                                          <strong>Submitted:</strong> {selectedApplication.submissionDate}
                                        </div>
                                        {selectedApplication.approvalDate && (
                                          <div>
                                            <strong>Approved:</strong> {selectedApplication.approvalDate}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Documents</h4>
                                      <div className="space-y-1">
                                        {selectedApplication.documents.map((doc, index) => (
                                          <div
                                            key={index}
                                            className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                                          >
                                            📄 {doc}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Business Description</h4>
                                    <p className="text-sm text-slate-300">{selectedApplication.description}</p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Business Plan</h4>
                                    <p className="text-sm text-slate-300">{selectedApplication.businessPlan}</p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Expected Impact</h4>
                                    <p className="text-sm text-slate-300">{selectedApplication.impact}</p>
                                  </div>

                                  {selectedApplication.status === "rejected" && selectedApplication.rejectionReason && (
                                    <div>
                                      <h4 className="font-semibold mb-2 text-red-400">Rejection Reason</h4>
                                      <p className="text-sm text-red-300">{selectedApplication.rejectionReason}</p>
                                    </div>
                                  )}
                                </div>

                                {(selectedApplication.status === "pending" ||
                                  selectedApplication.status === "under_review") && (
                                  <div className="flex gap-4 pt-4 border-t border-slate-700">
                                    <Button
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleApprove(selectedApplication.id)}
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve Application
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                                      onClick={() => {
                                        const reason = prompt("Please provide a reason for rejection:")
                                        if (reason) handleReject(selectedApplication.id, reason)
                                      }}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Reject Application
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {(application.status === "pending" || application.status === "under_review") && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/10">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem
                                className="text-green-400 hover:bg-slate-700"
                                onClick={() => handleApprove(application.id)}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-slate-700"
                                onClick={() => {
                                  const reason = prompt("Please provide a reason for rejection:")
                                  if (reason) handleReject(application.id, reason)
                                }}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
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
