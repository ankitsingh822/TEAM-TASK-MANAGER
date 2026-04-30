const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, priority, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and project ID are required' });
    }

    // Check if user is project member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isAuthorized = project.owner.toString() === req.user.id || 
                         project.members.some(m => m.toString() === req.user.id);
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo,
      createdBy: req.user.id,
      priority,
      dueDate,
    });

    await task.save();
    await task.populate('assignedTo createdBy', 'name email');
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get tasks for project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isAuthorized = project.owner.toString() === req.user.id || 
                         project.members.some(m => m.toString() === req.user.id);
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all tasks for user (dashboard)
router.get('/user/dashboard', auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ assignedTo: req.user.id }, { createdBy: req.user.id }],
    })
      .populate('project', 'name')
      .populate('assignedTo createdBy', 'name email')
      .sort({ dueDate: 1 });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length;

    res.json({
      tasks,
      stats: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        overdueTasks,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is authorized (assigned to or created by)
    const isAuthorized = task.assignedTo && task.assignedTo.toString() === req.user.id ||
                         task.createdBy.toString() === req.user.id;
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    task.updatedAt = Date.now();

    await task.save();
    await task.populate('assignedTo createdBy', 'name email');
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only creator can delete
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
