const mongoose = require('mongoose');

const TodoListSchema = mongoose.Schema(
  {
    UserName: { type: 'string' },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    DueDate: { type: Date },
    Priority: { type: String, enum: ['High', 'Medium', 'Low'] },
    AssignedTo: { type: String },
    Completed: { type: Boolean, default: false },
    CompletedAt: { type: Date },
    Status: { type: String, default: 'Pending' },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    collection: 'TodoList',
  }
);

const TodoListModel = mongoose.model('TodoList', TodoListSchema);
module.exports = TodoListModel;
