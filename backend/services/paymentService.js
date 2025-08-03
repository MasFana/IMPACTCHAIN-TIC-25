const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const axios = require("axios")
const midtransClient = require("midtrans-client")

class PaymentService {
  constructor() {
    // Initialize Midtrans
    this.midtransSnap = new midtransClient.Snap({
      isProduction: process.env.NODE_ENV === "production",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    this.midtransCore = new midtransClient.CoreApi({
      isProduction: process.env.NODE_ENV === "production",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })
  }

  async processPayment({ amount, currency, paymentMethod, paymentDetails, donationId, userId }) {
    try {
      switch (paymentMethod) {
        case "credit_card":
          return await this.processStripePayment({ amount, currency, paymentDetails, donationId })

        case "bank_transfer":
        case "e_wallet":
          return await this.processMidtransPayment({ amount, paymentMethod, paymentDetails, donationId, userId })

        case "crypto":
          return await this.processCryptoPayment({ amount, paymentDetails, donationId })

        default:
          throw new Error("Unsupported payment method")
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      throw error
    }
  }

  // Stripe payment processing (for international credit cards)
  async processStripePayment({ amount, currency, paymentDetails, donationId }) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), // Stripe expects amount in smallest currency unit
        currency: currency.toLowerCase(),
        payment_method: paymentDetails.paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
        metadata: {
          donationId: donationId.toString(),
          type: "donation",
        },
      })

      let status = "pending"
      if (paymentIntent.status === "succeeded") {
        status = "completed"
      } else if (paymentIntent.status === "requires_action") {
        status = "processing"
      } else if (paymentIntent.status === "payment_failed") {
        status = "failed"
      }

      return {
        provider: "stripe",
        paymentIntentId: paymentIntent.id,
        transactionId: paymentIntent.id,
        status,
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      }
    } catch (error) {
      console.error("Stripe payment error:", error)
      throw new Error(`Stripe payment failed: ${error.message}`)
    }
  }

  // Midtrans payment processing (for Indonesian payments)
  async processMidtransPayment({ amount, paymentMethod, paymentDetails, donationId, userId }) {
    try {
      const orderId = `donation-${donationId}-${Date.now()}`

      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        customer_details: {
          first_name: paymentDetails.customerName || "Donor",
          email: paymentDetails.customerEmail,
          phone: paymentDetails.customerPhone,
        },
        item_details: [
          {
            id: donationId.toString(),
            price: amount,
            quantity: 1,
            name: "Donation to Social Impact Program",
          },
        ],
      }

      // Add payment method specific parameters
      if (paymentMethod === "bank_transfer") {
        parameter.payment_type = "bank_transfer"
        parameter.bank_transfer = {
          bank: paymentDetails.bank || "bca",
        }
      } else if (paymentMethod === "e_wallet") {
        parameter.payment_type = paymentDetails.walletType || "gopay"
        if (paymentDetails.walletType === "gopay") {
          parameter.gopay = {
            enable_callback: true,
            callback_url: `${process.env.API_URL}/api/donations/webhook/midtrans`,
          }
        }
      }

      const transaction = await this.midtransSnap.createTransaction(parameter)

      return {
        provider: "midtrans",
        transactionId: orderId,
        paymentUrl: transaction.redirect_url,
        token: transaction.token,
        status: "pending",
      }
    } catch (error) {
      console.error("Midtrans payment error:", error)
      throw new Error(`Midtrans payment failed: ${error.message}`)
    }
  }

  // Cryptocurrency payment processing
  async processCryptoPayment({ amount, paymentDetails, donationId }) {
    try {
      // For crypto payments, we'll generate a wallet address and wait for payment
      const walletAddress = process.env.CRYPTO_WALLET_ADDRESS

      if (!walletAddress) {
        throw new Error("Crypto wallet not configured")
      }

      // Convert IDR to cryptocurrency
      const cryptoAmount = await this.convertToCrypto(amount, paymentDetails.cryptoType || "ETH")

      return {
        provider: "crypto",
        walletAddress,
        cryptoType: paymentDetails.cryptoType || "ETH",
        cryptoAmount,
        status: "pending",
        instructions: `Send ${cryptoAmount} ${paymentDetails.cryptoType || "ETH"} to ${walletAddress}`,
      }
    } catch (error) {
      console.error("Crypto payment error:", error)
      throw new Error(`Crypto payment failed: ${error.message}`)
    }
  }

  // Convert IDR to cryptocurrency
  async convertToCrypto(idrAmount, cryptoType) {
    try {
      // This is a simplified conversion - in production, use real exchange rate APIs
      const exchangeRates = {
        ETH: 0.000001, // 1 IDR = 0.000001 ETH (example rate)
        BTC: 0.0000001, // 1 IDR = 0.0000001 BTC (example rate)
      }

      const rate = exchangeRates[cryptoType]
      if (!rate) {
        throw new Error(`Unsupported crypto type: ${cryptoType}`)
      }

      return (idrAmount * rate).toFixed(8)
    } catch (error) {
      console.error("Crypto conversion error:", error)
      throw error
    }
  }

  // Verify Stripe webhook
  async verifyStripeWebhook(payload, signature) {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET)
      return event
    } catch (error) {
      console.error("Stripe webhook verification error:", error)
      throw new Error("Invalid webhook signature")
    }
  }

  // Verify Midtrans notification
  async verifyMidtransNotification(notification) {
    try {
      const statusResponse = await this.midtransCore.transaction.notification(notification)
      return statusResponse
    } catch (error) {
      console.error("Midtrans notification verification error:", error)
      throw new Error("Invalid Midtrans notification")
    }
  }

  // Get payment status
  async getPaymentStatus(provider, transactionId) {
    try {
      switch (provider) {
        case "stripe":
          const paymentIntent = await stripe.paymentIntents.retrieve(transactionId)
          return {
            status: this.mapStripeStatus(paymentIntent.status),
            details: paymentIntent,
          }

        case "midtrans":
          const status = await this.midtransCore.transaction.status(transactionId)
          return {
            status: this.mapMidtransStatus(status.transaction_status),
            details: status,
          }

        default:
          throw new Error("Unsupported payment provider")
      }
    } catch (error) {
      console.error("Get payment status error:", error)
      throw error
    }
  }

  // Map Stripe status to our internal status
  mapStripeStatus(stripeStatus) {
    const statusMap = {
      succeeded: "completed",
      processing: "processing",
      requires_payment_method: "failed",
      requires_confirmation: "pending",
      requires_action: "processing",
      canceled: "failed",
      payment_failed: "failed",
    }
    return statusMap[stripeStatus] || "pending"
  }

  // Map Midtrans status to our internal status
  mapMidtransStatus(midtransStatus) {
    const statusMap = {
      capture: "completed",
      settlement: "completed",
      pending: "pending",
      deny: "failed",
      cancel: "failed",
      expire: "failed",
      failure: "failed",
    }
    return statusMap[midtransStatus] || "pending"
  }

  // Process refund
  async processRefund({ provider, transactionId, amount, reason }) {
    try {
      switch (provider) {
        case "stripe":
          const refund = await stripe.refunds.create({
            payment_intent: transactionId,
            amount: Math.round(amount),
            reason: "requested_by_customer",
            metadata: { reason },
          })
          return {
            refundId: refund.id,
            status: refund.status,
            amount: refund.amount,
          }

        case "midtrans":
          const refundResult = await this.midtransCore.transaction.refund(transactionId, {
            amount: amount,
            reason: reason,
          })
          return {
            refundId: refundResult.refund_key,
            status: "processing",
            amount: amount,
          }

        default:
          throw new Error("Refund not supported for this payment method")
      }
    } catch (error) {
      console.error("Refund processing error:", error)
      throw error
    }
  }
}

module.exports = new PaymentService()
