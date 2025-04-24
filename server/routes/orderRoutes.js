const express = require("express");
const router = express.Router();
const {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrder,
  updateStatus,
} = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");
const authUser = require("../middleware/auth");

router.get("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

router.post("/place", authUser, placeOrder);

router.get("/userorders", authUser, userOrder);

module.exports = router;
