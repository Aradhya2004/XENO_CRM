const express = require("express");
const router = express.Router();
const { deliverCampaign, getLogs } = require("../controllers/deliveryController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/deliver", isAuthenticated, deliverCampaign);
router.get("/logs/:campaignId", isAuthenticated, getLogs);

module.exports = router;
