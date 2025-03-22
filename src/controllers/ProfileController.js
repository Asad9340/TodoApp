const ProfileModel = require('../models/ProfileModel');
const bcrypt = require('bcryptjs');
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
    console.log(user)
    if (!user) {
      return res.status(400).json({ Status: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ Status: false, message: 'Invalid credentials' });
    }
    res.status(200).json({
      Status: true,
      message: 'Login successful',
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
