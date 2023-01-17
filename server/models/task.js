import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const task = mongoose.model("tasks", taskSchema);

export default task;
