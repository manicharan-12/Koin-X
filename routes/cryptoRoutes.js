const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

router.get("/stats", cryptoController.getLatestStats);
router.get("/deviation", cryptoController.getDeviation);

module.exports = router;
