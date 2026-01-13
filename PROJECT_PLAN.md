# Task Management System - Development Plan

## Project Overview

Building a full-stack Kanban-based Task Management System with user authentication and drag-and-drop functionality.

---

## 📋 Phase 0: Setup & Technology Decisions ✅

### ✅ Technology Stack Selected:

1. **Backend Technology**: ✅ Node.js + Express
2. **Database**: ✅ MongoDB
3. **Frontend Framework**: ✅ React (Vite)
4. **CSS Framework**: ✅ Tailwind CSS

### 📝 Your Details for Repository:

- Name: Badal Oraon
- Roll Number: BTECH/10738/22
- Repository Name: `badaloraon_BTECH_10738_22`

---

## 📁 Phase 1: Project Structure Setup

### Tasks:

- [ ] Create repository with naming convention: `yourname_rollnumber`
- [ ] Initialize Git repository
- [ ] Create folder structure:
  ```
  yourname_rollnumber/
  ├── backend/
  │   ├── src/
  │   ├── tests/
  │   ├── .env.example
  │   └── README.md
  ├── frontend/
  │   ├── src/
  │   ├── public/
  │   └── README.md
  ├── .gitignore
  └── README.md
  ```
- [ ] Setup .gitignore (node_modules, .env, etc.)
- [ ] Initial commit

---

## 🔧 Phase 2: Backend Development

### 2.1 Project Initialization

- [ ] Initialize backend project
- [ ] Install necessary dependencies
- [ ] Setup environment variables
- [ ] Configure database connection

### 2.2 Database Schema Design

- [ ] Design User table/model:
  - id (primary key)
  - username/email
  - password (hashed)
  - created_at
  - updated_at
- [ ] Design Task table/model:
  - id (primary key)
  - user_id (foreign key)
  - title
  - description
  - status (pending/in-progress/completed)
  - due_date
  - created_at
  - updated_at

### 2.3 Authentication System

- [ ] Implement password hashing
- [ ] Create Sign Up endpoint (POST /api/auth/signup)
- [ ] Create Login endpoint (POST /api/auth/login)
- [ ] Create Logout endpoint (POST /api/auth/logout)
- [ ] Implement JWT/Session token generation
- [ ] Create authentication middleware

### 2.4 User Management

- [ ] Get user profile (GET /api/users/profile)
- [ ] Update user profile (PUT /api/users/profile)
- [ ] Delete user account (DELETE /api/users/profile)

### 2.5 Task Management

- [ ] Create task (POST /api/tasks)
- [ ] Get all tasks for user (GET /api/tasks)
- [ ] Get tasks by status (GET /api/tasks?status=pending)
- [ ] Get single task (GET /api/tasks/:id)
- [ ] Update task (PUT /api/tasks/:id)
- [ ] Delete task (DELETE /api/tasks/:id)

### 2.6 Input Validation & Error Handling

- [ ] Add input validation for all endpoints
- [ ] Implement proper error responses with status codes
- [ ] Add request logging

### 2.7 Testing

- [ ] Test all authentication endpoints
- [ ] Test all task CRUD operations
- [ ] Test error scenarios
- [ ] Optional: Write unit tests

### 2.8 Documentation

- [ ] Create backend README.md with:
  - Setup instructions
  - API endpoints documentation
  - Environment variables
  - Run instructions

---

## 🎨 Phase 3: Frontend Development

### 3.1 Project Initialization

- [ ] Initialize frontend project
- [ ] Install dependencies (routing, HTTP client, drag-drop library)
- [ ] Setup folder structure
- [ ] Configure API base URL

### 3.2 Authentication Pages

- [ ] Create Login page
- [ ] Create Signup page
- [ ] Create Profile page
- [ ] Implement authentication state management
- [ ] Setup protected routes
- [ ] Add logout functionality

### 3.3 Kanban Board UI

- [ ] Create main dashboard/board layout
- [ ] Create three columns (Pending, In Progress, Completed)
- [ ] Design task card component with:
  - Title
  - Short description
  - Due date
  - Edit/Delete buttons

### 3.4 Task Operations

- [ ] Implement create task modal/form
- [ ] Implement edit task modal/form
- [ ] Implement delete task confirmation
- [ ] Fetch and display tasks from backend
- [ ] Group tasks by status in respective columns

### 3.5 Drag & Drop Functionality

- [ ] Implement drag and drop library
- [ ] Enable dragging tasks between columns
- [ ] Update task status on drop
- [ ] Persist status changes to backend
- [ ] Add visual feedback during drag

### 3.6 Responsive Design

- [ ] Make layout mobile responsive
- [ ] Test on different screen sizes
- [ ] Ensure drag-drop works on mobile (or provide alternative)

### 3.7 Error Handling & UX

- [ ] Display loading states
- [ ] Show error messages
- [ ] Add success notifications
- [ ] Handle network errors gracefully

### 3.8 Documentation

- [ ] Create frontend README.md with:
  - Setup instructions
  - Run instructions
  - Build instructions

---

## 📝 Phase 4: Integration & Testing

### Tasks:

- [ ] Test complete user flow (signup → login → create tasks → drag-drop → logout)
- [ ] Test all error scenarios
- [ ] Verify authentication protections work
- [ ] Test on multiple browsers
- [ ] Test mobile responsiveness
- [ ] Fix any bugs found

---

## 📚 Phase 5: Documentation & Polish

### 5.1 Main README.md

- [ ] Add project overview
- [ ] List tech stack
- [ ] Add setup instructions (backend + frontend)
- [ ] Document environment variables
- [ ] Add API overview
- [ ] Include screenshots
- [ ] Add demo link (if deployed)

### 5.2 Code Quality

- [ ] Remove console.logs
- [ ] Remove commented code
- [ ] Ensure consistent formatting
- [ ] Add code comments where necessary
- [ ] Review variable naming

### 5.3 Git

- [ ] Review commit history
- [ ] Ensure meaningful commit messages
- [ ] Verify .gitignore is working
- [ ] Check no sensitive data is committed

---

## 🚀 Phase 6: Deployment (Optional)

### Backend Options:

- [ ] Render
- [ ] Railway
- [ ] Heroku
- [ ] AWS/Azure/GCP

### Frontend Options:

- [ ] Vercel
- [ ] Netlify
- [ ] GitHub Pages

### Tasks:

- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Update API URLs
- [ ] Test deployed version
- [ ] Add URLs to README

---

## 📤 Phase 7: Final Submission

### Checklist:

- [ ] All features working
- [ ] README.md complete
- [ ] .env.example provided
- [ ] Clean commit history
- [ ] No node_modules or .env committed
- [ ] Code is well-organized
- [ ] Error handling implemented
- [ ] Input validation working
- [ ] Mobile responsive
- [ ] Submit repository link

---

## 🎯 Success Criteria

- ✅ Clean and maintainable code
- ✅ Proper folder organization
- ✅ Code reusability
- ✅ Complete functionality
- ✅ Proper error handling
- ✅ Good documentation
- ✅ Meaningful commit history

---

## Notes:

- Follow the plan step by step
- Test after each phase
- Commit frequently with meaningful messages
- Ask for help when stuck
- Keep code clean and readable
