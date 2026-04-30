# Team Task Manager

A full-stack web application for managing projects and tracking tasks with role-based access control.

## 🚀 Features

- **Authentication**: Secure signup/login with JWT
- **Project Management**: Create and manage projects with team members
- **Task Management**: Create, assign, and track tasks with status and priority
- **Dashboard**: Overview of tasks, progress tracking, and overdue alerts
- **Role-Based Access**: Admin and Member roles with different permissions
- **Real-time Updates**: Live task status updates and progress tracking

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - REST API framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Railway account (for deployment)

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. Start server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start development server:
   ```bash
   npm start
   ```

## 🌐 Deployment on Railway

### Prerequisites
- Railway account (sign up at railway.app)
- GitHub repository with your code

### Steps

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Backend**:
   - Go to railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `/backend` directory
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
   - Deploy

3. **Deploy Frontend**:
   - Create another Railway project
   - Select your GitHub repo
   - Select the `/frontend` directory
   - Add environment variable:
     - `REACT_APP_API_URL`: Your backend Railway URL
   - Deploy

4. **Configure MongoDB**:
   - Use MongoDB Atlas free tier
   - Create a cluster and get connection string
   - Add to backend environment variables

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project

### Tasks
- `GET /api/tasks/project/:projectId` - Get project tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/user/dashboard` - Get user dashboard

## 💾 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'member',
  createdAt: Date
}
```

### Project
```javascript
{
  name: String,
  description: String,
  owner: ObjectId (User),
  members: [ObjectId (User)],
  status: 'active' | 'archived' | 'completed',
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String,
  description: String,
  project: ObjectId (Project),
  assignedTo: ObjectId (User),
  createdBy: ObjectId (User),
  status: 'todo' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Role-based access control
- Secure task management with authorization checks

## 📱 User Roles & Permissions

### Admin
- Create and manage projects
- Manage team members
- Create and assign tasks
- Delete projects and tasks

### Member
- View assigned projects
- Create and manage own tasks
- Update task status
- View project dashboard

## 🎯 Key Workflows

### Create a Project
1. Login to dashboard
2. Navigate to Projects page
3. Click "New Project"
4. Enter project details
5. Create project

### Create a Task
1. Go to project
2. Click "New Task"
3. Fill task details
4. Assign to team member
5. Set priority and due date
6. Create task

### Track Progress
1. View Dashboard
2. Check task statistics
3. Filter by status
4. Update task status
5. Monitor overdue tasks

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MONGODB_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are valid

### CORS Error
- Verify frontend URL in backend CORS config
- Check API_URL in frontend environment

### Task Not Updating
- Verify user is authenticated
- Check user has permission to update
- Verify task exists

## 📞 Support

For issues or questions, please create an issue on GitHub.

## 📄 License

MIT License
