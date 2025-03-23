const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const router = express.Router();

router.post('/createUser', ProfileController.CreateProfile);
router.post('/loginUser', ProfileController.LoginUser);
router.get('/viewProfile', AuthVerifyMiddleware, ProfileController.viewProfile);
router.put('/updateUser', AuthVerifyMiddleware, ProfileController.updateUser);

module.exports = router;
