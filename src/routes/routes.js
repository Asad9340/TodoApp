const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const router = express.Router();

router.post('/createUser', ProfileController.CreateProfile);
router.post('/loginUser', ProfileController.LoginUser);

module.exports = router;