const { ethers } = require("hardhat")
const hre = require("hardhat") // Declare hre variable

async function main() {
  console.log("Deploying ImpactChain contract...")

  // Get the contract factory
  const ImpactChain = await ethers.getContractFactory("ImpactChain")

  // Deploy the contract
  const impactChain = await ImpactChain.deploy(
    "ImpactChain Token", // Token name
    "ICT", // Token symbol
    "0x742d35Cc6cf34e8f3a7b3c6f8f8f8f8f8f8f8f8f", // Fee recipient address
  )

  await impactChain.deployed()

  console.log("ImpactChain contract deployed to:", impactChain.address)
  console.log("Transaction hash:", impactChain.deployTransaction.hash)

  // Verify the contract on Etherscan (optional)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await impactChain.deployTransaction.wait(6)

    console.log("Verifying contract on Etherscan...")
    try {
      await hre.run("verify:verify", {
        address: impactChain.address,
        constructorArguments: ["ImpactChain Token", "ICT", "0x742d35Cc6cf34e8f3a7b3c6f8f8f8f8f8f8f8f8f"],
      })
      console.log("Contract verified successfully")
    } catch (error) {
      console.log("Error verifying contract:", error.message)
    }
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress: impactChain.address,
    transactionHash: impactChain.deployTransaction.hash,
    blockNumber: impactChain.deployTransaction.blockNumber,
    deployer: await impactChain.signer.getAddress(),
    timestamp: new Date().toISOString(),
    network: hre.network.name,
  }

  const fs = require("fs")
  fs.writeFileSync("./deployment-info.json", JSON.stringify(deploymentInfo, null, 2))

  console.log("Deployment info saved to deployment-info.json")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
