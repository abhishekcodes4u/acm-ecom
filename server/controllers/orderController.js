const Order = require("../models/orderModel");
const User = require("../models/userModel");
// cash on delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, messge: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// stripe
const placeOrderStripe = async (req, res) => {};
// RazorPay
const placeOrderRazorpay = async (req, res) => {};
// order for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// order for frontend
const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//update order status admin panel
const updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.body.id, {
      status: req.body.newStatus,
    });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: true, messaeg: error.message });
  }
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrder,
  updateStatus,
};
