# Issue Troubleshooting Guide

## Common Issues & Solutions

### Backend Issues

#### 1. MongoDB Connection Error
**Error**: `MongoNetworkError` or `connection refused`

**Solutions**:
- Verify MONGODB_URI in `.env` file
- Check MongoDB Atlas IP whitelist (Allow 0.0.0.0/0 for dev)
- Ensure username and password are correct
- Try connection string: `mongodb+srv://admin:password@cluster.mongodb.net/db?retryWrites=true&w=majority`
- Check internet connection

#### 2. Port Already in Use
**Error**: `listen EADDRINUSE: address already in use :::5000`

**Solutions**:
- Kill process on port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -i :5000` then `kill -9 <PID>`
- Or change PORT in `.env` to different port (e.g., 5001)

#### 3. Cannot Find Module
**Error**: `Cannot find module 'express'`

**Solutions**:
- Run `npm install` in backend folder
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check package.json exists in backend folder
- Verify Node.js version: `node --version` (should be 14+)

#### 4. JWT_SECRET Not Set
**Error**: `TypeError: JWT_SECRET is undefined`

**Solutions**:
- Add JWT_SECRET to `.env` file
- Use any random string: `JWT_SECRET=my_secret_key_12345`
- Restart backend server after adding

#### 5. CORS Error
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
- Check CORS configuration in `server.js`
- Verify frontend URL is allowed
- Add to backend: `app.use(cors())`
- Restart backend server

### Frontend Issues

#### 1. Blank Page / Nothing Renders
**Solutions**:
- Check browser console for errors
- Verify `npm start` completed successfully
- Clear browser cache: Ctrl+Shift+Delete
- Delete node_modules and reinstall
- Check `src/index.html` exists

#### 2. Cannot Connect to Backend
**Error**: `Network Error` or `Failed to fetch`

**Solutions**:
- Verify backend is running: `http://localhost:5000/api/health`
- Check REACT_APP_API_URL in `.env.local`
- Should be: `REACT_APP_API_URL=http://localhost:5000/api`
- Restart frontend after changing `.env.local`
- Check backend port (default 5000)

#### 3. Login/Signup Not Working
**Solutions**:
- Check backend is running
- Verify MongoDB connection
- Check email/password in form
- Look at browser DevTools Network tab for error responses
- Check backend logs for errors

#### 4. Tasks Not Loading
**Error**: `Failed to fetch tasks`

**Solutions**:
- Ensure you're logged in (token in localStorage)
- Verify project exists
- Check backend logs
- Verify user is project member
- Try creating new project and task

#### 5. Port 3000 Already in Use
**Error**: `Something is already listening on port 3000`

**Solutions**:
- Kill process: `lsof -i :3000 && kill -9 <PID>`
- Or change port: `PORT=3001 npm start`

### Authentication Issues

#### 1. Token Expired
**Error**: `401 Unauthorized`

**Solutions**:
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET is same on backend
- Verify token in Network tab

#### 2. Cannot Signup / Email Already Exists
**Error**: `User already exists`

**Solutions**:
- Use different email
- Check if email already registered
- Reset database if needed
- Use different test emails

#### 3. Wrong Password / Cannot Login
**Error**: `Invalid credentials`

**Solutions**:
- Verify email exists
- Check password is correct (case-sensitive)
- Ensure password was hashed on signup
- Try signup with new account

### Database Issues

#### 1. Connection String Invalid
**Error**: `Invalid connection string`

**Solutions**:
- Format: `mongodb+srv://username:password@cluster.mongodb.net/db`
- Check username/password in string
- Escape special characters in password
- Use correct cluster name

#### 2. MongoDB Atlas Whitelist
**Error**: `IP 192.168.x.x not whitelisted`

**Solutions**:
- Go to MongoDB Atlas
- Network Access → Add IP Address
- Add 0.0.0.0/0 for development
- Or add your specific IP

#### 3. Database Not Found
**Solutions**:
- MongoDB creates DB automatically
- Verify database name in connection string
- Check for typos in DB name
- Collections created on first insert

### Docker & Deployment Issues

#### 1. Docker Build Fails
**Solutions**:
- Verify Dockerfile exists
- Check Node.js version in Dockerfile
- Run `npm install` manually first
- Check for missing dependencies

#### 2. Railway Deployment Failed
**Solutions**:
- Check Railway build logs
- Verify environment variables set
- Ensure MongoDB URI is correct
- Check package.json start script

#### 3. Frontend Can't Connect to Backend on Railway
**Error**: CORS error or network error

**Solutions**:
- Update REACT_APP_API_URL to Railway backend URL
- Ensure backend URL is correct (no trailing slash)
- Check CORS enabled on backend
- Redeploy frontend after changing environment

### Performance Issues

#### 1. Application Slow
**Solutions**:
- Check network tab in DevTools
- Verify MongoDB queries
- Check backend logs for slow endpoints
- Consider adding indexes

#### 2. Too Many Requests
**Solutions**:
- Implement request debouncing
- Add pagination
- Cache API responses
- Reduce polling frequency

### Browser Console Errors

#### 1. undefined is not a function
**Solutions**:
- Check all imports are correct
- Verify function names match
- Check context providers wrap components
- Restart dev server

#### 2. Cannot read property 'something' of undefined
**Solutions**:
- Add null/undefined checks
- Use optional chaining: `obj?.prop`
- Check API response structure
- Add loading states

### Node.js / npm Issues

#### 1. npm command not found
**Solutions**:
- Install Node.js from nodejs.org
- Verify installation: `npm --version`
- Restart terminal/command prompt
- Add to PATH if needed

#### 2. node_modules Large
**Solutions**:
- This is normal (100MB+)
- Add node_modules to .gitignore
- Don't commit to Git
- Use npm ci for clean installs

#### 3. Dependency Conflicts
**Error**: `peer dependency` warnings

**Solutions**:
- Usually safe to ignore in development
- Run `npm install` to resolve
- Update dependencies: `npm update`

### Environment Variable Issues

#### 1. Variables Not Loading
**Solutions**:
- Check .env file syntax
- No quotes needed: `KEY=value`
- One variable per line
- Restart dev server after changing
- Check file exists in correct folder

#### 2. Wrong Environment Values
**Solutions**:
- Verify .env vs .env.local vs .env.production
- Check variables exist before using
- Use console.log to debug: `console.log(process.env.VAR_NAME)`
- Clear cache if needed

### Git & GitHub Issues

#### 1. .env Accidentally Committed
**Solutions**:
- Remove from Git history: `git rm --cached .env`
- Create `.gitignore` with `.env`
- Never commit sensitive data

#### 2. Large Files in Git
**Solutions**:
- Add node_modules to .gitignore
- Add build/ to .gitignore
- Use .gitignore before initial commit

## Getting Help

1. **Check Documentation**:
   - QUICK_START.md
   - API_DOCUMENTATION.md
   - ENV_VARIABLES.md

2. **Check Logs**:
   - Backend: Terminal output
   - Frontend: Browser Console (F12)
   - MongoDB: MongoDB Atlas logs

3. **Network Tab**:
   - Open DevTools (F12)
   - Go to Network tab
   - Check request/response details

4. **Debug Mode**:
   - Add `console.log` statements
   - Use VS Code debugger
   - Check values in browser console

## Still Having Issues?

1. Search the error message
2. Check all documentation
3. Review setup steps
4. Verify environment variables
5. Check logs carefully
6. Try clean install: `npm install` with node_modules deleted
7. Restart development servers
8. Restart your computer if all else fails

Remember: Most issues are configuration-related. Double-check your setup!
