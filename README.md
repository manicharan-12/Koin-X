# KoinX Backend Assignment

A production-grade Node.js application that tracks and analyzes cryptocurrency prices using the CoinGecko API. The service provides real-time price statistics and price deviation analysis for Bitcoin, Ethereum, and Matic.

## 🌐 Deployed API
Base URL: `https://koin-x-57a6.onrender.com` 

## ✨ Features

- Background job running every 2 hours to fetch latest cryptocurrency data
- Real-time price statistics API
- Standard deviation calculation for price analysis
- Production-grade error handling and security measures
- Rate limiting to prevent API abuse
- Comprehensive data validation
- MongoDB for reliable data storage

## 🚀 Live API Examples

### Get Latest Statistics
```bash
GET /stats/?coin=bitcoin

Response:
{
    "price": 94443,
    "marketCap": 1870115971769.1865,
    "24hChange": 2.238529593082627
}
```

### Get Price Deviation
```bash
GET /deviation/?coin=ethereum

Response:
{
    "deviation": 0
}
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/manicharan-12/Koin-X.git
cd crypto-stats-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crypto_stats
NODE_ENV=production
```

4. Start the server:
```bash
nodemon index.js
```

For development:
```bash
npm run dev
```

## 📡 API Endpoints

### Get Latest Statistics
```
GET /stats
```
Query Parameters:
- `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

### Get Price Deviation
```
GET /deviation
```
Query Parameters:
- `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

## 🏗️ Project Structure

```

├── config/          # Configuration files
├── controllers/     # Request handlers
├── jobs/            # Background tasks
├── models/          # Database models
├── routes/          # API routes
├── services/        # External service integrations
├── utils/           # Utility functions
└── index.js         # Application entry point
```

## 🔒 Security Features

- Helmet.js for secure HTTP headers
- Rate limiting (100 requests per 15 minutes per IP)
- Environment variable management
- Input validation
- Error handling middleware

## 📊 Data Storage

The application uses MongoDB with the following schema for cryptocurrency data:

```javascript
{
  coinId: String,
  priceUSD: Number,
  marketCapUSD: Number,
  change24h: Number,
  timestamp: Date
}
```
