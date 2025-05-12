const express = require("express");
const router = express.Router();
const { getCampaignAnalytics } = require("../controllers/analyticsController");
const isAuthenticated = require("../middleware/authMiddleware");

router.get("/:campaignId", isAuthenticated, getCampaignAnalytics);

module.exports = router;
