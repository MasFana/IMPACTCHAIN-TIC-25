const { ethers } = require("ethers")
const contractABI = require("../../blockchain/artifacts/contracts/ImpactChain.sol/ImpactChain.json")

class BlockchainService {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider)
    this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI.abi, this.wallet)
  }

  // Record donation on blockchain
  async recordDonationOnBlockchain({ donationId, donor, program, amount }) {
    try {
      const donationIdBytes32 = ethers.utils.formatBytes32String(donationId)
      const programIdBytes32 = ethers.utils.formatBytes32String(program.toString())

      // Convert amount to wei (assuming 1 IDR = 1 wei for simplicity)
      const amountWei = ethers.utils.parseEther((amount / 1e18).toString())

      const tx = await this.contract.recordDonation(donationIdBytes32, programIdBytes32, amountWei, {
        value: amountWei,
      })

      const receipt = await tx.wait()

      return {
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        confirmed: true,
      }
    } catch (error) {
      console.error("Blockchain donation recording error:", error)
      throw new Error(`Failed to record donation on blockchain: ${error.message}`)
    }
  }

  // Create program on blockchain
  async createProgramOnBlockchain({ programId, title, description, targetAmount, organizer }) {
    try {
      const programIdBytes32 = ethers.utils.formatBytes32String(programId)
      const targetAmountWei = ethers.utils.parseEther((targetAmount / 1e18).toString())

      const tx = await this.contract.createProgram(programIdBytes32, title, description, targetAmountWei)

      const receipt = await tx.wait()

      return {
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        contractAddress: this.contract.address,
      }
    } catch (error) {
      console.error("Blockchain program creation error:", error)
      throw new Error(`Failed to create program on blockchain: ${error.message}`)
    }
  }

  // Support UMKM on blockchain
  async supportUMKMOnBlockchain({ umkmId, amount, supporter }) {
    try {
      const umkmIdBytes32 = ethers.utils.formatBytes32String(umkmId)
      const amountWei = ethers.utils.parseEther((amount / 1e18).toString())

      const tx = await this.contract.supportUMKM(umkmIdBytes32, { value: amountWei })
      const receipt = await tx.wait()

      return {
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        confirmed: true,
      }
    } catch (error) {
      console.error("Blockchain UMKM support error:", error)
      throw new Error(`Failed to support UMKM on blockchain: ${error.message}`)
    }
  }

  // Complete mission on blockchain
  async completeMissionOnBlockchain({ missionId, userId }) {
    try {
      const missionIdBytes32 = ethers.utils.formatBytes32String(missionId)

      const tx = await this.contract.completeMission(missionIdBytes32, userId)
      const receipt = await tx.wait()

      return {
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        confirmed: true,
      }
    } catch (error) {
      console.error("Blockchain mission completion error:", error)
      throw new Error(`Failed to complete mission on blockchain: ${error.message}`)
    }
  }

  // Get user stats from blockchain
  async getUserStatsFromBlockchain(userAddress) {
    try {
      const stats = await this.contract.getUserStats(userAddress)

      return {
        points: stats.points.toString(),
        tokenBalance: ethers.utils.formatEther(stats.tokenBalance),
        donationCount: stats.donationCount.toString(),
      }
    } catch (error) {
      console.error("Get user stats error:", error)
      throw new Error(`Failed to get user stats from blockchain: ${error.message}`)
    }
  }

  // Get program stats from blockchain
  async getProgramStatsFromBlockchain(programId) {
    try {
      const programIdBytes32 = ethers.utils.formatBytes32String(programId)
      const stats = await this.contract.getProgramStats(programIdBytes32)

      return {
        raisedAmount: ethers.utils.formatEther(stats.raisedAmount),
        targetAmount: ethers.utils.formatEther(stats.targetAmount),
        donationCount: stats.donationCount.toString(),
        isActive: stats.isActive,
      }
    } catch (error) {
      console.error("Get program stats error:", error)
      throw new Error(`Failed to get program stats from blockchain: ${error.message}`)
    }
  }

  // Reward tokens to user
  async rewardTokens({ userAddress, amount, reason }) {
    try {
      const amountWei = ethers.utils.parseEther(amount.toString())

      const tx = await this.contract.rewardTokens(userAddress, amountWei, reason)
      const receipt = await tx.wait()

      return {
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        confirmed: true,
      }
    } catch (error) {
      console.error("Token reward error:", error)
      throw new Error(`Failed to reward tokens: ${error.message}`)
    }
  }

  // Get transaction details
  async getTransactionDetails(txHash) {
    try {
      const tx = await this.provider.getTransaction(txHash)
      const receipt = await this.provider.getTransactionReceipt(txHash)

      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.utils.formatEther(tx.value),
        gasPrice: ethers.utils.formatUnits(tx.gasPrice, "gwei"),
        gasUsed: receipt ? receipt.gasUsed.toString() : null,
        blockNumber: receipt ? receipt.blockNumber : null,
        status: receipt ? (receipt.status === 1 ? "success" : "failed") : "pending",
        confirmations: receipt ? receipt.confirmations : 0,
      }
    } catch (error) {
      console.error("Get transaction details error:", error)
      throw new Error(`Failed to get transaction details: ${error.message}`)
    }
  }

  // Check if address is valid
  isValidAddress(address) {
    return ethers.utils.isAddress(address)
  }

  // Get current gas price
  async getCurrentGasPrice() {
    try {
      const gasPrice = await this.provider.getGasPrice()
      return ethers.utils.formatUnits(gasPrice, "gwei")
    } catch (error) {
      console.error("Get gas price error:", error)
      return "20" // Default fallback
    }
  }

  // Estimate gas for transaction
  async estimateGas(method, params) {
    try {
      const gasEstimate = await this.contract.estimateGas[method](...params)
      return gasEstimate.toString()
    } catch (error) {
      console.error("Gas estimation error:", error)
      return "100000" // Default fallback
    }
  }
}

module.exports = new BlockchainService()
