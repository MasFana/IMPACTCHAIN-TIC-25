// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ImpactChain is ERC20, Ownable, ReentrancyGuard, Pausable {
    // Events
    event DonationRecorded(
        bytes32 indexed donationId,
        address indexed donor,
        bytes32 indexed programId,
        uint256 amount,
        uint256 timestamp
    );
    
    event ProgramCreated(
        bytes32 indexed programId,
        address indexed organizer,
        string title,
        uint256 targetAmount,
        uint256 timestamp
    );
    
    event UMKMSupported(
        bytes32 indexed umkmId,
        address indexed supporter,
        uint256 amount,
        uint256 timestamp
    );
    
    event MissionCompleted(
        bytes32 indexed missionId,
        address indexed user,
        uint256 pointsEarned,
        uint256 timestamp
    );
    
    event TokensRewarded(
        address indexed user,
        uint256 amount,
        string reason,
        uint256 timestamp
    );

    // Structs
    struct Donation {
        bytes32 id;
        address donor;
        bytes32 programId;
        uint256 amount;
        uint256 timestamp;
        bool verified;
    }
    
    struct Program {
        bytes32 id;
        address organizer;
        string title;
        string description;
        uint256 targetAmount;
        uint256 raisedAmount;
        uint256 createdAt;
        bool isActive;
        bool verified;
    }
    
    struct UMKM {
        bytes32 id;
        address owner;
        string businessName;
        uint256 requestedAmount;
        uint256 raisedAmount;
        uint256 createdAt;
        bool approved;
        bool funded;
    }
    
    struct Mission {
        bytes32 id;
        string title;
        uint256 pointsReward;
        uint256 tokenReward;
        bool isActive;
    }

    // State variables
    mapping(bytes32 => Donation) public donations;
    mapping(bytes32 => Program) public programs;
    mapping(bytes32 => UMKM) public umkms;
    mapping(bytes32 => Mission) public missions;
    mapping(address => uint256) public userPoints;
    mapping(address => bytes32[]) public userDonations;
    mapping(bytes32 => bytes32[]) public programDonations;
    
    // Admin addresses
    mapping(address => bool) public admins;
    
    // Fee settings
    uint256 public platformFeePercentage = 250; // 2.5%
    address public feeRecipient;
    
    // Token economics
    uint256 public constant TOKENS_PER_DONATION = 1e18; // 1 token per 1000 IDR donated
    uint256 public constant TOKENS_PER_POINT = 1e15; // 0.001 token per point
    
    // Counters
    uint256 public totalDonations;
    uint256 public totalPrograms;
    uint256 public totalUMKMs;
    
    constructor(
        string memory name,
        string memory symbol,
        address _feeRecipient
    ) ERC20(name, symbol) {
        feeRecipient = _feeRecipient;
        admins[msg.sender] = true;
        
        // Mint initial supply to contract for rewards
        _mint(address(this), 1000000 * 1e18); // 1M tokens
    }
    
    // Modifiers
    modifier onlyAdmin() {
        require(admins[msg.sender], "Not an admin");
        _;
    }
    
    modifier validProgram(bytes32 programId) {
        require(programs[programId].id != bytes32(0), "Program does not exist");
        require(programs[programId].isActive, "Program is not active");
        _;
    }
    
    // Admin functions
    function addAdmin(address admin) external onlyOwner {
        admins[admin] = true;
    }
    
    function removeAdmin(address admin) external onlyOwner {
        admins[admin] = false;
    }
    
    function setPlatformFee(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 1000, "Fee cannot exceed 10%");
        platformFeePercentage = _feePercentage;
    }
    
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        feeRecipient = _feeRecipient;
    }
    
    function pause() external onlyAdmin {
        _pause();
    }
    
    function unpause() external onlyAdmin {
        _unpause();
    }
    
    // Program functions
    function createProgram(
        bytes32 programId,
        string memory title,
        string memory description,
        uint256 targetAmount
    ) external whenNotPaused {
        require(programs[programId].id == bytes32(0), "Program already exists");
        require(targetAmount > 0, "Target amount must be greater than 0");
        
        programs[programId] = Program({
            id: programId,
            organizer: msg.sender,
            title: title,
            description: description,
            targetAmount: targetAmount,
            raisedAmount: 0,
            createdAt: block.timestamp,
            isActive: false, // Needs admin approval
            verified: false
        });
        
        totalPrograms++;
        
        emit ProgramCreated(programId, msg.sender, title, targetAmount, block.timestamp);
    }
    
    function approveProgram(bytes32 programId) external onlyAdmin {
        require(programs[programId].id != bytes32(0), "Program does not exist");
        programs[programId].isActive = true;
        programs[programId].verified = true;
    }
    
    function deactivateProgram(bytes32 programId) external onlyAdmin {
        require(programs[programId].id != bytes32(0), "Program does not exist");
        programs[programId].isActive = false;
    }
    
    // Donation functions
    function recordDonation(
        bytes32 donationId,
        bytes32 programId,
        uint256 amount
    ) external payable validProgram(programId) whenNotPaused nonReentrant {
        require(donations[donationId].id == bytes32(0), "Donation already recorded");
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value >= amount, "Insufficient payment");
        
        // Calculate platform fee
        uint256 fee = (amount * platformFeePercentage) / 10000;
        uint256 netAmount = amount - fee;
        
        // Record donation
        donations[donationId] = Donation({
            id: donationId,
            donor: msg.sender,
            programId: programId,
            amount: netAmount,
            timestamp: block.timestamp,
            verified: true
        });
        
        // Update program
        programs[programId].raisedAmount += netAmount;
        
        // Update mappings
        userDonations[msg.sender].push(donationId);
        programDonations[programId].push(donationId);
        
        // Award points (1 point per 1000 wei)
        uint256 points = amount / 1000;
        userPoints[msg.sender] += points;
        
        // Award tokens
        uint256 tokenReward = (amount * TOKENS_PER_DONATION) / 1e18;
        if (tokenReward > 0 && balanceOf(address(this)) >= tokenReward) {
            _transfer(address(this), msg.sender, tokenReward);
            emit TokensRewarded(msg.sender, tokenReward, "Donation reward", block.timestamp);
        }
        
        // Transfer funds
        if (fee > 0) {
            payable(feeRecipient).transfer(fee);
        }
        payable(programs[programId].organizer).transfer(netAmount);
        
        totalDonations++;
        
        emit DonationRecorded(donationId, msg.sender, programId, netAmount, block.timestamp);
    }
    
    // UMKM functions
    function createUMKM(
        bytes32 umkmId,
        string memory businessName,
        uint256 requestedAmount
    ) external whenNotPaused {
        require(umkms[umkmId].id == bytes32(0), "UMKM already exists");
        require(requestedAmount > 0, "Requested amount must be greater than 0");
        
        umkms[umkmId] = UMKM({
            id: umkmId,
            owner: msg.sender,
            businessName: businessName,
            requestedAmount: requestedAmount,
            raisedAmount: 0,
            createdAt: block.timestamp,
            approved: false,
            funded: false
        });
        
        totalUMKMs++;
    }
    
    function approveUMKM(bytes32 umkmId) external onlyAdmin {
        require(umkms[umkmId].id != bytes32(0), "UMKM does not exist");
        umkms[umkmId].approved = true;
    }
    
    function supportUMKM(bytes32 umkmId) external payable whenNotPaused nonReentrant {
        require(umkms[umkmId].id != bytes32(0), "UMKM does not exist");
        require(umkms[umkmId].approved, "UMKM not approved");
        require(!umkms[umkmId].funded, "UMKM already funded");
        require(msg.value > 0, "Amount must be greater than 0");
        
        umkms[umkmId].raisedAmount += msg.value;
        
        // Check if funding target reached
        if (umkms[umkmId].raisedAmount >= umkms[umkmId].requestedAmount) {
            umkms[umkmId].funded = true;
        }
        
        // Award points and tokens
        uint256 points = msg.value / 1000;
        userPoints[msg.sender] += points;
        
        uint256 tokenReward = (msg.value * TOKENS_PER_DONATION) / 1e18;
        if (tokenReward > 0 && balanceOf(address(this)) >= tokenReward) {
            _transfer(address(this), msg.sender, tokenReward);
            emit TokensRewarded(msg.sender, tokenReward, "UMKM support reward", block.timestamp);
        }
        
        //RewardReward, "UMKM support reward", block.timestamp);
        }
        
        // Transfer funds to UMKM owner
        payable(umkms[umkmId].owner).transfer(msg.value);
        
        emit UMKMSupported(umkmId, msg.sender, msg.value, block.timestamp);
    }
    
    // Mission functions
    function createMission(
        bytes32 missionId,
        string memory title,
        uint256 pointsReward,
        uint256 tokenReward
    ) external onlyAdmin {
        require(missions[missionId].id == bytes32(0), "Mission already exists");
        
        missions[missionId] = Mission({
            id: missionId,
            title: title,
            pointsReward: pointsReward,
            tokenReward: tokenReward,
            isActive: true
        });
    }
    
    function completeMission(
        bytes32 missionId,
        address user
    ) external onlyAdmin {
        require(missions[missionId].id != bytes32(0), "Mission does not exist");
        require(missions[missionId].isActive, "Mission is not active");
        
        Mission memory mission = missions[missionId];
        
        // Award points
        userPoints[user] += mission.pointsReward;
        
        // Award tokens
        if (mission.tokenReward > 0 && balanceOf(address(this)) >= mission.tokenReward) {
            _transfer(address(this), user, mission.tokenReward);
            emit TokensRewarded(user, mission.tokenReward, "Mission completion", block.timestamp);
        }
        
        emit MissionCompleted(missionId, user, mission.pointsReward, block.timestamp);
    }
    
    function deactivateMission(bytes32 missionId) external onlyAdmin {
        require(missions[missionId].id != bytes32(0), "Mission does not exist");
        missions[missionId].isActive = false;
    }
    
    // Token reward functions
    function rewardTokens(
        address user,
        uint256 amount,
        string memory reason
    ) external onlyAdmin {
        require(balanceOf(address(this)) >= amount, "Insufficient contract balance");
        _transfer(address(this), user, amount);
        emit TokensRewarded(user, amount, reason, block.timestamp);
    }
    
    function convertPointsToTokens(uint256 points) external whenNotPaused {
        require(userPoints[msg.sender] >= points, "Insufficient points");
        require(points > 0, "Points must be greater than 0");
        
        uint256 tokenAmount = points * TOKENS_PER_POINT;
        require(balanceOf(address(this)) >= tokenAmount, "Insufficient contract balance");
        
        userPoints[msg.sender] -= points;
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit TokensRewarded(msg.sender, tokenAmount, "Points conversion", block.timestamp);
    }
    
    // View functions
    function getUserDonations(address user) external view returns (bytes32[] memory) {
        return userDonations[user];
    }
    
    function getProgramDonations(bytes32 programId) external view returns (bytes32[] memory) {
        return programDonations[programId];
    }
    
    function getUserStats(address user) external view returns (
        uint256 points,
        uint256 tokenBalance,
        uint256 donationCount
    ) {
        return (
            userPoints[user],
            balanceOf(user),
            userDonations[user].length
        );
    }
    
    function getProgramStats(bytes32 programId) external view returns (
        uint256 raisedAmount,
        uint256 targetAmount,
        uint256 donationCount,
        bool isActive
    ) {
        Program memory program = programs[programId];
        return (
            program.raisedAmount,
            program.targetAmount,
            programDonations[programId].length,
            program.isActive
        );
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function emergencyTokenWithdraw(uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient balance");
        _transfer(address(this), owner(), amount);
    }
    
    // Receive function to accept ETH
    receive() external payable {}
}
