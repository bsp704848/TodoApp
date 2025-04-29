import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
