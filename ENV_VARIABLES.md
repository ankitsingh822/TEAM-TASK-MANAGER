# Environment Variables Guide

## Backend (.env)

Create `backend/.env` with the following variables:

### Required Variables

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Optional Variables

```
# Logging
LOG_LEVEL=info

# CORS
CORS_ORIGIN=http://localhost:3000

# Session
SESSION_TIMEOUT=7d
```

## Frontend (.env.local)

Create `frontend/.env.local` with:

```
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

## Frontend (.env.production)

For production builds:

```
REACT_APP_API_URL=https://your-railway-backend-url/api
```

## Railway Environment Variables

### Backend Service

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
JWT_SECRET=your_production_secret_key_here
NODE_ENV=production
PORT=5000
```

### Frontend Service

```
REACT_APP_API_URL=https://your-backend-railway-url
```

## Generating JWT Secret

### Option 1: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option 2: Using OpenSSL
```bash
openssl rand -hex 32
```

### Option 3: Using Command Line
```bash
head -c 32 /dev/urandom | base64
```

## MongoDB Connection String

### Format
```
mongodb+srv://username:password@cluster.mongodb.net/database-name
```

### Example
```
mongodb+srv://admin:mypassword@cluster0.abcde.mongodb.net/team-task-manager
```

### Getting Your Connection String
1. Go to MongoDB Atlas
2. Click "Connect"
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials
6. Replace `<database-name>` with the database name

## Security Notes

- Never commit `.env` files to Git
- Rotate JWT_SECRET periodically
- Use strong MongoDB passwords
- Use URL-safe characters in passwords (or URL-encode special characters)
- Change default values in production
- Use HTTPS in production
- Store secrets in Railway/deployment platform secrets management

## Example .env File

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://admin:securepassword123@cluster0.abc123.mongodb.net/team-task-manager

# Authentication
JWT_SECRET=5f9c4ab08cac7457e9111a30e4664882d2790181614b3bd5e2d6b0b2ae6d4f3f

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

## Troubleshooting

### "MONGODB_URI is not set"
- Check `backend/.env` exists
- Verify variable name is correct (case-sensitive)
- Restart backend server after changing

### "MongoDB connection refused"
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network access is enabled

### "JWT_SECRET not configured"
- Add JWT_SECRET to .env
- Restart backend server
- Don't leave it empty

### Special Characters in Password
If your password contains special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

Example:
```
Password: Pass@123#Word
Encoded: Pass%40123%23Word
Connection: mongodb+srv://admin:Pass%40123%23Word@cluster.mongodb.net/db
```
