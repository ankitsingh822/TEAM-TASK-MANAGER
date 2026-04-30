import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as taskAPI from '../api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await taskAPI.getDashboardTasks();
      setTasks(res.data.tasks);
      setStats(res.data.stats);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      fetchDashboard();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const getFilteredTasks = () => {
    if (filter === 'all') return tasks;
    if (filter === 'completed') return tasks.filter(t => t.status === 'completed');
    if (filter === 'overdue') return tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed');
    return tasks.filter(t => t.status === filter);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">Task Manager</div>
        <div className="navbar-menu">
          <button onClick={() => navigate('/projects')}>Projects</button>
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalTasks || 0}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.inProgressTasks || 0}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completedTasks || 0}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.overdueTasks || 0}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Your Tasks</h2>
            <div className="filter-buttons">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
              <button className={filter === 'todo' ? 'active' : ''} onClick={() => setFilter('todo')}>To Do</button>
              <button className={filter === 'in-progress' ? 'active' : ''} onClick={() => setFilter('in-progress')}>In Progress</button>
              <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
              <button className={filter === 'overdue' ? 'active' : ''} onClick={() => setFilter('overdue')}>Overdue</button>
            </div>
          </div>

          <div className="tasks-list">
            {getFilteredTasks().length === 0 ? (
              <p className="no-tasks">No tasks found</p>
            ) : (
              getFilteredTasks().map(task => (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`priority ${task.priority}`}>{task.priority}</span>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <span>Project: {task.project?.name}</span>
                    {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                  </div>
                  <div className="task-footer">
                    <select 
                      value={task.status} 
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button onClick={() => navigate(`/tasks/${task._id}`)}>View</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
