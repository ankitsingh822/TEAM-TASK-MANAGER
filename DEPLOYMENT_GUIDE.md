# Team Task Manager - Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub account with repository
- MongoDB Atlas account for database
- GitHub repository containing this project

## Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create a new cluster (M0 free tier)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/team-task-manager`
5. Save this URL

## Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Team Task Manager"
git branch -M main
git remote add origin https://github.com/yourusername/team-task-manager.git
git push -u origin main
```

## Step 3: Deploy Backend on Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize and select your repository
5. Create a new service:
   - Click "Add Service"
   - Select "GitHub Repo"
   - Choose your repo again
   - Set root directory to `/backend`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string (e.g., `your_super_secret_key_123`)
   - `NODE_ENV`: production
7. Railway will auto-detect Node.js and start deployment
8. Once deployed, note the backend URL (e.g., `https://team-task-manager-prod.railway.app`)

## Step 4: Deploy Frontend on Railway

1. In Railway dashboard, create a new project
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Create a new service:
   - Set root directory to `/frontend`
6. Add environment variable:
   - `REACT_APP_API_URL`: Your backend Railway URL (from Step 3)
7. Railway will build and deploy your React app
8. Once deployed, you'll get your live frontend URL

## Step 5: Verify Deployment

1. Open your frontend URL in browser
2. Sign up with test account
3. Create a project
4. Create and assign tasks
5. Verify all features work

## Environment Variables Summary

### Backend (.env on Railway)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
JWT_SECRET=your_secure_random_key_here
NODE_ENV=production
PORT=5000
```

### Frontend (.env on Railway)
```
REACT_APP_API_URL=https://your-backend-railway-url
```

## Troubleshooting

### MongoDB Connection Error
- Verify connection string is correct
- Check MongoDB Atlas whitelist includes Railway IPs
- Ensure password doesn't contain special characters or is URL-encoded

### Frontend Can't Connect to Backend
- Verify backend URL in `REACT_APP_API_URL`
- Check backend is deployed and running
- Verify CORS is enabled in backend

### Deploy Failed
- Check Railway logs for errors
- Ensure package.json scripts are correct
- Verify Node.js version is 14+

## Monitoring

- Check backend logs: Railway Dashboard > Backend Service > Logs
- Check frontend logs: Railway Dashboard > Frontend Service > Logs
- Monitor database: MongoDB Atlas dashboard

## Redeploy

To redeploy after changes:

1. Push changes to GitHub
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin main
   ```

2. Railway will automatically trigger a new deployment

That's it! Your Team Task Manager is now live on Railway! 🚀
