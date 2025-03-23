const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const TodoListController = require('../controllers/TodoController')
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const router = express.Router();

router.post('/createUser', ProfileController.CreateProfile);
router.post('/loginUser', ProfileController.LoginUser);
router.get('/viewProfile', AuthVerifyMiddleware, ProfileController.viewProfile);
router.put('/updateUser', AuthVerifyMiddleware, ProfileController.updateUser);

// todo routes
router.post('/createTodo', AuthVerifyMiddleware, TodoListController.createTodo);

module.exports = router;
