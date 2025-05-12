const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, getOrders);

module.exports = router;
