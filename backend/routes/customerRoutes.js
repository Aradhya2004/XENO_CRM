const express = require("express");
const router = express.Router();
const { createCustomer, getCustomers } = require("../controllers/customerController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, createCustomer);
router.get("/", isAuthenticated, getCustomers);

module.exports = router;
