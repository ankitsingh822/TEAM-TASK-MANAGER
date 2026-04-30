# API Documentation

## Base URL
- Local: `http://localhost:5000/api`
- Production: `https://your-railway-url/api`

## Authentication
All endpoints (except signup/login) require:
```
Authorization: Bearer <JWT_TOKEN>
```

## Endpoints

### 1. Authentication

#### Signup
**POST** `/auth/signup`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

#### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

#### Get Current User
**GET** `/auth/me`

Response:
```json
{
  "_id": "60d5ec49c1234567890abcde",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "member",
  "createdAt": "2024-04-30T10:00:00Z"
}
```

### 2. Projects

#### Get All Projects
**GET** `/projects`

Response:
```json
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "name": "Project Name",
    "description": "Project description",
    "owner": {
      "_id": "60d5ec49c1234567890abcdf",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "members": [
      {
        "_id": "60d5ec49c1234567890abcdf",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ],
    "status": "active",
    "createdAt": "2024-04-30T10:00:00Z",
    "updatedAt": "2024-04-30T10:00:00Z"
  }
]
```

#### Create Project
**POST** `/projects`

Request:
```json
{
  "name": "New Project",
  "description": "Project description"
}
```

Response: (Single project object)

#### Get Single Project
**GET** `/projects/:id`

Response: (Single project object)

#### Update Project
**PUT** `/projects/:id`

Request:
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "active"
}
```

Response: (Updated project object)

#### Add Member to Project
**POST** `/projects/:id/members`

Request:
```json
{
  "memberId": "60d5ec49c1234567890abcde"
}
```

Response: (Updated project object)

#### Delete Project
**DELETE** `/projects/:id`

Response:
```json
{
  "message": "Project deleted"
}
```

### 3. Tasks

#### Get Project Tasks
**GET** `/tasks/project/:projectId`

Response:
```json
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "title": "Task Title",
    "description": "Task description",
    "project": {
      "_id": "60d5ec49c1234567890abcde"
    },
    "assignedTo": {
      "_id": "60d5ec49c1234567890abcdf",
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "createdBy": {
      "_id": "60d5ec49c1234567890abcdf",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "todo",
    "priority": "high",
    "dueDate": "2024-05-15T00:00:00Z",
    "createdAt": "2024-04-30T10:00:00Z",
    "updatedAt": "2024-04-30T10:00:00Z"
  }
]
```

#### Create Task
**POST** `/tasks`

Request:
```json
{
  "title": "Task Title",
  "description": "Task description",
  "projectId": "60d5ec49c1234567890abcde",
  "assignedTo": "60d5ec49c1234567890abcdf",
  "priority": "high",
  "dueDate": "2024-05-15T00:00:00Z"
}
```

Response: (Single task object)

#### Get Dashboard
**GET** `/tasks/user/dashboard`

Response:
```json
{
  "tasks": [
    {
      "_id": "60d5ec49c1234567890abcde",
      "title": "Task Title",
      "status": "in-progress",
      ...
    }
  ],
  "stats": {
    "totalTasks": 10,
    "completedTasks": 5,
    "inProgressTasks": 3,
    "overdueTasks": 2
  }
}
```

#### Update Task
**PUT** `/tasks/:id`

Request:
```json
{
  "title": "Updated Title",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2024-05-20T00:00:00Z",
  "assignedTo": "60d5ec49c1234567890abcdf"
}
```

Response: (Updated task object)

#### Delete Task
**DELETE** `/tasks/:id`

Response:
```json
{
  "message": "Task deleted"
}
```

## Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized (missing/invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Server Error

## Error Response Format

```json
{
  "message": "Error description"
}
```

## Rate Limiting

No rate limiting currently implemented. Add middleware for production.

## Pagination

Pagination not currently implemented. Add for production.

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'
```

### Get Projects (with token)
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"Test Project","description":"Test description"}'
```

## Webhooks

Not currently implemented.

## GraphQL

Not currently implemented (REST only).
