const express = require("express");
const router = express.Router();
const { createCampaign, getCampaigns } = require("../controllers/campaignController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, createCampaign);
router.get("/", isAuthenticated, getCampaigns);

module.exports = router;
