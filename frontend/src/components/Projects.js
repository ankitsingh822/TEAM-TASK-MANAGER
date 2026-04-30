import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as projectAPI from '../api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Projects.css';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getProjects();
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectAPI.createProject(formData.name, formData.description);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.deleteProject(projectId);
        fetchProjects();
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="projects-page">
      <nav className="navbar">
        <div className="navbar-brand">Task Manager</div>
        <div className="navbar-menu">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/projects')} className="active">Projects</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="projects-content">
        <div className="projects-header">
          <h1>Projects</h1>
          <button className="create-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {showForm && (
          <form className="project-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
            />
            <button type="submit">Create Project</button>
          </form>
        )}

        <div className="projects-grid">
          {projects.length === 0 ? (
            <p className="no-projects">No projects yet. Create one!</p>
          ) : (
            projects.map(project => (
              <div key={project._id} className="project-card">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span>Members: {project.members.length}</span>
                  <span className={`status ${project.status}`}>{project.status}</span>
                </div>
                <div className="project-actions">
                  <button onClick={() => navigate(`/projects/${project._id}`)}>View</button>
                  <button onClick={() => handleDelete(project._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
