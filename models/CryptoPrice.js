//models/CryptoPrice.js

const mongoose = require("mongoose");

const cryptoPriceSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
      enum: ["bitcoin", "matic-network", "ethereum"],
    },
    priceUSD: {
      type: Number,
      required: true,
    },
    marketCapUSD: {
      type: Number,
      required: true,
    },
    change24h: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
cryptoPriceSchema.index({ coinId: 1, timestamp: -1 });

module.exports = mongoose.model("CryptoPrice", cryptoPriceSchema);
