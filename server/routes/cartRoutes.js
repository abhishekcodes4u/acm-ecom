const express = require("express");
const {
  addToCart,
  getUserCart,
  updateCart,
} = require("../controllers/cartController");
const AuthUser = require("../middleware/auth");
const router = express.Router();

router.post("/get", AuthUser, getUserCart);
router.post("/add", AuthUser, addToCart);
router.post("/update", AuthUser, updateCart);

module.exports = router;
