const axios = require("axios");

class CoinGeckoService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.coingecko.com/api/v3",
      timeout: 5000,
    });
  }

  async getCoinData(coinId) {
    try {
      const response = await this.api.get(`/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      });

      if (!response.data[coinId]) {
        throw new Error(`No data found for coin: ${coinId}`);
      }

      return {
        priceUSD: response.data[coinId].usd,
        marketCapUSD: response.data[coinId].usd_market_cap,
        change24h: response.data[coinId].usd_24h_change,
      };
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error);
      throw error;
    }
  }
}

module.exports = new CoinGeckoService();
