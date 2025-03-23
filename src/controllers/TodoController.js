const TodoListModel = require('../models/TodoModel');

exports.createTodo = async (req, res) => {
  try {
    const { UserName, Email } = req.user;
    const todo = { ...req.body, UserName, Email };
    const data = await TodoListModel.create(todo);

    res.status(201).json({ Status: true, data });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const { UserName } = req.user;
    const todos = await TodoListModel.find({ UserName }).sort({
      CreatedAt: -1,
    });
    res.status(200).json({ Status: true, data: todos });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoData = await TodoListModel.find({ _id: todoId });
    if (!todoData.length) {
      return res.status(404).json({ Status: false, message: 'Todo not found' });
    } else {
      const updatedTodo = await TodoListModel.findByIdAndUpdate(
        todoId,
        { ...req.body, LastUpdated: Date.now() },
        { new: true }
      );
      res.status(200).json({ Status: true, data: updatedTodo });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoData = await TodoListModel.find({ _id: todoId });
    if (!todoData.length) {
      return res.status(404).json({ Status: false, message: 'Todo not found' });
    } else {
      await TodoListModel.findByIdAndDelete(todoId);
      res
        .status(200)
        .json({ Status: true, data: { message: 'Todo deleted successfully' } });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
