const CryptoPrice = require("../models/CryptoPrice");
const { calculateStandardDeviation } = require("../utils/mathUtils");

class CryptoController {
  async getLatestStats(req, res) {
    try {
      const { coin } = req.query;

      if (!coin) {
        return res.status(400).json({ error: "Coin parameter is required" });
      }

      const latestData = await CryptoPrice.findOne(
        { coinId: coin },
        { priceUSD: 1, marketCapUSD: 1, change24h: 1 },
        { sort: { timestamp: -1 } }
      );

      if (!latestData) {
        return res
          .status(404)
          .json({ error: "No data found for the specified coin" });
      }

      return res.json({
        price: latestData.priceUSD,
        marketCap: latestData.marketCapUSD,
        "24hChange": latestData.change24h,
      });
    } catch (error) {
      console.error("Error in getLatestStats:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDeviation(req, res) {
    try {
      const { coin } = req.query;

      if (!coin) {
        return res.status(400).json({ error: "Coin parameter is required" });
      }

      const prices = await CryptoPrice.find(
        { coinId: coin },
        { priceUSD: 1 },
        { sort: { timestamp: -1 }, limit: 100 }
      );

      if (prices.length === 0) {
        return res
          .status(404)
          .json({ error: "No data found for the specified coin" });
      }

      const priceValues = prices.map((p) => p.priceUSD);
      const deviation = calculateStandardDeviation(priceValues);

      return res.json({
        deviation: parseFloat(deviation.toFixed(2)),
      });
    } catch (error) {
      console.error("Error in getDeviation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new CryptoController();
