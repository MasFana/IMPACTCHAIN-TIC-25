# ImpactChain - Social Impact Platform

ImpactChain is a blockchain-based social impact platform that connects donors, social programs, and local businesses (UMKM) to create measurable positive change in communities.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Team](#team)
- [License](#license)

## Features

### For Donors
- Discover and donate to verified social programs
- Track donation impact in real-time
- Complete missions to earn rewards
- View leaderboard and achievements
- Receive tax-deductible receipts

### For Social Programs
- Create and manage fundraising campaigns
- Receive transparent donations via blockchain
- Post updates and milestones
- Access donor analytics

### For UMKM (Local Businesses)
- Get funding and support from the community
- Participate in social impact initiatives
- Gain visibility through the platform

### Admin Features
- Comprehensive dashboard
- User and donation management
- UMKM verification system
- Reporting and analytics
- System health monitoring

## Technologies

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Components**: Shadcn UI + Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Authentication**: JWT
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Email**: Nodemailer/SendGrid
- **Payments**: Stripe/Midtrans

### Blockchain
- **Smart Contracts**: Solidity (Hardhat)
- **Network**: Ethereum/Polygon compatible

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/impactchain.git
   cd impactchain
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd app
   npm install

   # Backend
   cd ../backend
   npm install

   # Blockchain
   cd ../blockchain
   npm install
   ```

## Configuration

1. Create `.env` files in both `app/` and `backend/` directories based on the provided `.env.example` files.

2. Configure MongoDB connection in `backend/.env`.

3. Set up blockchain network configuration in `blockchain/hardhat.config.js`.

## Running the App

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd app
   npm run dev
   ```

3. (Optional) Run local blockchain node:
   ```bash
   cd blockchain
   npx hardhat node
   ```

### Production Build

1. Build the frontend:
   ```bash
   cd app
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
impactchain/
├── app/                    # Next.js frontend
│   ├── components/         # Reusable UI components
│   ├── routes/             # Application routes
│   ├── stores/             # Zustand state management
│   └── ...                 
│
├── backend/                # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── ...                 
│
├── blockchain/             # Smart contracts
│   ├── contracts/          # Solidity contracts
│   └── scripts/            # Deployment scripts
│
└── ...
```

## Team

ImpactChain was developed by Team Tiara for the Web Development Competition:

- Bashrc - Team Leader/Fullstack Dev
- Fana - Designer/Developer 
- Skylumie - System Analyst/Developer
