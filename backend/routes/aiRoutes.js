const express = require("express");
const router = express.Router();
const { generateCampaignSuggestions } = require("../controllers/aiController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/suggestions", isAuthenticated, generateCampaignSuggestions);

module.exports = router;
