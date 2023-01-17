import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new Task({ task: req.body.task });
    const task = await newTask.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
