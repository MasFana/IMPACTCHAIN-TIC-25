const nodemailer = require("nodemailer")
const sgMail = require("@sendgrid/mail")
const fs = require("fs").promises
const path = require("path")

class EmailService {
  constructor() {
    // Initialize SendGrid
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      this.useSendGrid = true
    } else {
      // Fallback to SMTP
      this.transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
      this.useSendGrid = false
    }
  }

  async sendEmail({ to, subject, template, data, attachments = [] }) {
    try {
      let html = ""

      if (template) {
        html = await this.renderTemplate(template, data)
      } else if (data.html) {
        html = data.html
      } else {
        html = data.text || ""
      }

      const emailData = {
        to,
        from: process.env.FROM_EMAIL || "noreply@impactchain.com",
        subject,
        html,
        attachments,
      }

      if (this.useSendGrid) {
        await sgMail.send(emailData)
      } else {
        await this.transporter.sendMail(emailData)
      }

      console.log(`Email sent successfully to ${to}`)
      return { success: true }
    } catch (error) {
      console.error("Email sending error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }
  }

  async renderTemplate(templateName, data) {
    try {
      const templatePath = path.join(__dirname, "..", "templates", "email", `${templateName}.html`)
      let template = await fs.readFile(templatePath, "utf8")

      // Simple template replacement
      Object.keys(data).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, "g")
        template = template.replace(regex, data[key] || "")
      })

      return template
    } catch (error) {
      console.error("Template rendering error:", error)
      throw new Error(`Failed to render email template: ${error.message}`)
    }
  }

  // Send welcome email
  async sendWelcomeEmail(user, verificationUrl) {
    return this.sendEmail({
      to: user.email,
      subject: "Welcome to ImpactChain! 🎉",
      template: "welcome",
      data: {
        name: user.name,
        verificationUrl,
        loginUrl: `${process.env.FRONTEND_URL}/login`,
        supportEmail: process.env.FROM_EMAIL,
      },
    })
  }

  // Send donation receipt
  async sendDonationReceipt(donation, user, program) {
    return this.sendEmail({
      to: user.email,
      subject: "Donation Receipt - Thank You! 💝",
      template: "donation-receipt",
      data: {
        donorName: user.name,
        programTitle: program.title,
        amount: this.formatCurrency(donation.amount),
        receiptNumber: donation.receipt.receiptNumber,
        donationDate: this.formatDate(donation.createdAt),
        programUrl: `${process.env.FRONTEND_URL}/programs/${program._id}`,
        receiptUrl: `${process.env.FRONTEND_URL}/donations/${donation._id}/receipt`,
      },
    })
  }

  // Send UMKM approval notification
  async sendUMKMApprovalEmail(umkm, user) {
    return this.sendEmail({
      to: user.email,
      subject: "UMKM Application Approved! 🎊",
      template: "umkm-approval",
      data: {
        ownerName: user.name,
        businessName: umkm.businessName,
        approvedAmount: this.formatCurrency(umkm.financial.requestedAmount),
        dashboardUrl: `${process.env.FRONTEND_URL}/umkm/${umkm._id}`,
        supportEmail: process.env.FROM_EMAIL,
      },
    })
  }

  // Send mission completion notification
  async sendMissionCompletionEmail(user, mission, pointsEarned) {
    return this.sendEmail({
      to: user.email,
      subject: "Mission Completed! 🏆",
      template: "mission-completion",
      data: {
        userName: user.name,
        missionTitle: mission.title,
        pointsEarned,
        newLevel: user.level,
        dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
      },
    })
  }

  // Send password reset email
  async sendPasswordResetEmail(user, resetUrl) {
    return this.sendEmail({
      to: user.email,
      subject: "Reset Your Password - ImpactChain",
      template: "password-reset",
      data: {
        name: user.name,
        resetUrl,
        supportEmail: process.env.FROM_EMAIL,
      },
    })
  }

  // Send monthly impact report
  async sendMonthlyReport(user, reportData) {
    return this.sendEmail({
      to: user.email,
      subject: "Your Monthly Impact Report 📊",
      template: "monthly-report",
      data: {
        userName: user.name,
        month: reportData.month,
        totalDonations: this.formatCurrency(reportData.totalDonations),
        programsSupported: reportData.programsSupported,
        pointsEarned: reportData.pointsEarned,
        impactSummary: reportData.impactSummary,
        dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
      },
    })
  }

  // Utility functions
  formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  formatDate(date) {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }
}

module.exports = new EmailService()
