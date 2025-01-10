const cron = require("node-cron");
const CryptoPrice = require("../models/CryptoPrice");
const coinGeckoService = require("../services/coinGeckoService");

const SUPPORTED_COINS = ["bitcoin", "matic-network", "ethereum"];

const updateCryptoPrices = async () => {
  console.log("Starting crypto price update job");

  for (const coinId of SUPPORTED_COINS) {
    try {
      const coinData = await coinGeckoService.getCoinData(coinId);

      await CryptoPrice.create({
        coinId,
        priceUSD: coinData.priceUSD,
        marketCapUSD: coinData.marketCapUSD,
        change24h: coinData.change24h,
      });

      console.log(`Updated data for ${coinId}`);
    } catch (error) {
      console.error(`Failed to update data for ${coinId}:`, error);
    }
  }
};

// Schedule job to run every 2 hours
const scheduleJob = () => {
  cron.schedule("0 */2 * * *", updateCryptoPrices);
  console.log("Crypto price update job scheduled");
};

module.exports = { updateCryptoPrices, scheduleJob };
