const TodoListModel = require('../models/TodoModel');

exports.createTodo = async (req, res) => {
  try {
    const { UserName, Email } = req.user;
    const todo = { ...req.body, UserName, Email };
    console.log(todo);
    const data = await TodoListModel.create(todo);

    res.status(201).json({ Status: true, data });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
