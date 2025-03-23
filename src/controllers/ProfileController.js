const ProfileModel = require('../models/ProfileModel');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
exports.CreateProfile = async (req, res) => {
  try {
    let userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    userData.Password = hashedPassword;
    let data = await ProfileModel.create(userData);
    res.status(201).json({ Status: true, data: data });
  } catch (err) {
    res.status(500).json({ Status: false, message: err.message });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    const user = await ProfileModel.findOne({ UserName });
    if (!user) {
      return res.status(400).json({ Status: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ Status: false, message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      data: user,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      Status: true,
      message: 'Login successful',
      token: token,
      data: {
        UserId: user._id,
        UserName: user.UserName,
        Email: user.Email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ Status: false, message: 'Server error', error: err });
  }
};

exports.viewProfile = async (req, res) => {
  try {
    const UserName = req.user.UserName;
    const user = await ProfileModel.findOne({ UserName }).select('-Password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { UserName } = req.user;
    const { Email, UserName: _, ...updateData } = req.body;

    const updatedUser = await ProfileModel.findOneAndUpdate(
      { UserName },
      { ...updateData, LastUpdated: Date.now() },
      { new: true, select: '-Password' }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
