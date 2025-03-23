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
router.get('/getTodos', AuthVerifyMiddleware, TodoListController.getTodos);
router.put('/updateTodo/:id', AuthVerifyMiddleware, TodoListController.updateTodo);
router.delete('/deleteTodo/:id', AuthVerifyMiddleware, TodoListController.deleteTodo);
router.patch('/updateTodoStatus/:id', AuthVerifyMiddleware, TodoListController.updateTodoStatus);
router.patch('/updateTodoPriority/:id', AuthVerifyMiddleware, TodoListController.updateTodoPriority);
router.get('/filterTodos', AuthVerifyMiddleware, TodoListController.filterTodos);


module.exports = router;
