Team Task Manager - Full-Stack Application

A comprehensive web application for managing projects and tracking tasks with role-based access control.

FEATURES:
========
✓ User Authentication (Signup/Login with JWT)
✓ Project Management (Create, edit, delete projects)
✓ Task Management (Create, assign, track tasks)
✓ Team Collaboration (Add members to projects)
✓ Dashboard (Overview of tasks and progress)
✓ Role-Based Access (Admin/Member permissions)
✓ Task Filtering (By status, priority, due date)
✓ Real-time Status Updates
✓ Overdue Task Alerts

TECH STACK:
===========
Backend: Node.js, Express, MongoDB, JWT
Frontend: React, React Router, Axios
Deployment: Railway

REQUIREMENTS:
=============
- Node.js 14+
- MongoDB Atlas account
- Railway account (for deployment)
- Git

INSTALLATION:
==============
1. Backend Setup:
   - cd backend
   - npm install
   - Create .env file with MongoDB URI and JWT secret
   - npm run dev

2. Frontend Setup:
   - cd frontend
   - npm install
   - Create .env.local with API URL
   - npm start

DEPLOYMENT (Railway):
=====================
1. Push project to GitHub
2. Create Railway projects for backend and frontend
3. Connect GitHub repositories
4. Add environment variables
5. Configure MongoDB connection string
6. Deploy both services

DATABASE MODELS:
================
User:
- name, email, password (hashed), role, createdAt

Project:
- name, description, owner, members, status, createdAt, updatedAt

Task:
- title, description, project, assignedTo, createdBy, status, priority, dueDate, createdAt, updatedAt

API ENDPOINTS:
==============
Auth:
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

Projects:
- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id
- POST /api/projects/:id/members

Tasks:
- GET /api/tasks/project/:projectId
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/tasks/user/dashboard

SECURITY:
=========
✓ JWT Authentication
✓ Password Hashing (Bcrypt)
✓ CORS Protection
✓ Authorization Checks
✓ Role-Based Access Control

FOLDER STRUCTURE:
=================
demo-project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── rbac.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Projects.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   └── Projects.css
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── Dockerfile
│   └── Procfile
│
├── README.md
└── .gitignore

USAGE WORKFLOW:
===============
1. Sign Up: Create new account
2. Create Project: Start a new project
3. Add Members: Invite team members
4. Create Tasks: Define project tasks
5. Assign Tasks: Assign to team members
6. Track Progress: Monitor task status
7. Update Status: Mark tasks as complete

DEPLOYMENT CHECKLIST:
====================
□ Push code to GitHub
□ Create MongoDB Atlas cluster
□ Set up Railway account
□ Configure backend environment variables
□ Configure frontend environment variables
□ Deploy backend to Railway
□ Deploy frontend to Railway
□ Test all APIs
□ Verify authentication flow
□ Check task creation and updates
□ Confirm role-based access

NOTES:
======
- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Admin role assignment requires backend intervention
- Default role for new users is 'member'
- Only project owner can delete projects
- Only task creator can delete tasks
- Task assignment requires project membership

For more information, see README.md
