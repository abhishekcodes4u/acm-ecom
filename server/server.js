require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/mongodb");
const connectCloudinary = require("./config/cloudinary");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

const port = process.env.PORT || 4000;

db();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
