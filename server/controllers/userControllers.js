const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const genToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET);
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }
    // console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = genToken(user._id);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Password incorrect" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking if user already exist or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter Strong password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = genToken(user._id);
    res.json({ success: true, token, message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      token = genToken(email + password);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credential" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
