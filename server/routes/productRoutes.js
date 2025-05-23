const express = require("express");
const {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} = require("../controllers/productControllers");
const upload = require("../middleware/multer");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.post("/remove", adminAuth, removeProduct);
router.get("/single", singleProduct);
router.get("/list", listProducts);

module.exports = router;
