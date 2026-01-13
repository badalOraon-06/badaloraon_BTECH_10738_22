# Task Management System - Backend

Backend API for the Task Management System built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## Features

- User authentication (Sign up, Login, Logout)
- User profile management (Get, Update, Delete)
- Task CRUD operations
- Task filtering by status
- JWT-based protected routes
- Input validation and error handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task_management
   JWT_SECRET=your_secure_jwt_secret_key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```

### Running the Server

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/logout` - Logout user (Protected)

### User Management

- **GET** `/api/users/profile` - Get user profile (Protected)
- **PUT** `/api/users/profile` - Update user profile (Protected)
- **DELETE** `/api/users/profile` - Delete user account (Protected)

### Task Management

- **POST** `/api/tasks` - Create new task (Protected)
- **GET** `/api/tasks` - Get all user tasks (Protected)
- **GET** `/api/tasks?status=pending` - Filter tasks by status (Protected)
- **GET** `/api/tasks/:id` - Get single task (Protected)
- **PUT** `/api/tasks/:id` - Update task (Protected)
- **DELETE** `/api/tasks/:id` - Delete task (Protected)

## Request/Response Examples

### Sign Up

```json
POST /api/auth/signup
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

### Login

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

### Create Task

```json
POST /api/tasks
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
Body:
{
  "title": "Complete assignment",
  "description": "Finish the SDE assignment",
  "status": "pending",
  "due_date": "2024-12-31"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "user": "...",
    "title": "Complete assignment",
    "description": "Finish the SDE assignment",
    "status": "pending",
    "due_date": "2024-12-31T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Get Tasks

```json
GET /api/tasks
Headers: {
  "Authorization": "Bearer jwt_token_here"
}

Response:
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

## Database Models

### User Model

```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  user: ObjectId (ref: User),
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  due_date: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── userController.js  # User management logic
│   │   └── taskController.js  # Task management logic
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── errorMiddleware.js # Error handling
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── userRoutes.js      # User endpoints
│   │   └── taskRoutes.js      # Task endpoints
│   ├── utils/
│   │   └── jwt.js             # JWT utilities
│   └── server.js              # Entry point
├── tests/                      # Test files (optional)
├── .env                        # Environment variables
├── .env.example                # Example env file
├── package.json
└── README.md
```

## Environment Variables

| Variable    | Description               | Default               |
| ----------- | ------------------------- | --------------------- |
| PORT        | Server port               | 5000                  |
| NODE_ENV    | Environment mode          | development           |
| MONGODB_URI | MongoDB connection string | Required              |
| JWT_SECRET  | JWT secret key            | Required              |
| JWT_EXPIRE  | Token expiration time     | 7d                    |
| CLIENT_URL  | Frontend URL for CORS     | http://localhost:5173 |

## Author

Badal Oraon - BTECH/10738/22
