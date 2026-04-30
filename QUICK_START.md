# Quick Start Guide

## Local Development Setup

### Prerequisites
- Node.js 14+
- MongoDB Atlas account (free tier available)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager
```

### Step 2: Run Setup Script

**On Windows:**
```bash
setup.bat
```

**On Mac/Linux:**
```bash
bash setup.sh
```

Or manually:

### Step 3: Configure Backend
```bash
cd backend
nano .env  # or use your editor
```

Add:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
JWT_SECRET=any_random_secure_string_here
NODE_ENV=development
```

### Step 4: Start Backend
```bash
cd backend
npm run dev
```

Backend runs on: http://localhost:5000

### Step 5: Start Frontend
```bash
cd frontend
npm start
```

Frontend runs on: http://localhost:3000

## 🎯 Test the Application

1. **Sign Up**
   - Go to http://localhost:3000/signup
   - Create account with test data
   - You're automatically logged in

2. **Create Project**
   - Click "Projects" in navbar
   - Click "New Project"
   - Enter project name and description
   - Click "Create Project"

3. **View Dashboard**
   - Click "Dashboard"
   - See your statistics
   - View all your tasks

4. **Create Task**
   - From Dashboard, view tasks
   - Tasks are created from the Projects page
   - In Projects, view project details
   - Create new task

5. **Update Task Status**
   - Click on task
   - Change status using dropdown
   - See instant updates

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB URI in .env
- Ensure port 5000 is not in use
- Verify Node.js is installed: `node --version`

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 3000 is available
- Verify .env.local exists

### Can't connect frontend to backend
- Check backend is running on port 5000
- Verify REACT_APP_API_URL in frontend/.env.local
- Check browser console for errors

### MongoDB connection error
- Verify connection string is correct
- Check username/password
- Add your IP to MongoDB Atlas whitelist
- Allow network access for 0.0.0.0/0 (for development)

## 🚀 Next Steps

1. Test all features locally
2. Create GitHub repository
3. Follow DEPLOYMENT_GUIDE.md for Railway deployment
4. Record demo video
5. Submit with live URL, GitHub link, README, and video

## 📝 Database Reset

To reset database for testing:
1. Go to MongoDB Atlas
2. Select your cluster
3. Click "Collections"
4. Select "Delete Collection" for each collection
5. Restart application

## 🎨 Customize

Feel free to:
- Add more features
- Improve UI/UX
- Add notifications
- Add file uploads
- Add comments on tasks
- Add team messaging

Happy coding! 🚀
