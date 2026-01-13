# API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Test Sequence

### 1. Health Check
```bash
curl http://localhost:5000/
```

### 2. Sign Up (Create User)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**Save the token from the response!**

### 4. Get User Profile (Protected)
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Create Task (Protected)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"title\":\"Test Task\",\"description\":\"This is a test task\",\"status\":\"pending\",\"due_date\":\"2026-12-31\"}"
```

### 6. Get All Tasks (Protected)
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 7. Filter Tasks by Status (Protected)
```bash
curl http://localhost:5000/api/tasks?status=pending \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Update Task (Protected)
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"status\":\"in-progress\"}"
```

### 9. Delete Task (Protected)
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## PowerShell Version (Windows)

### Sign Up
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method POST -ContentType "application/json" -Body '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"password123"}'
$token = $response.data.token
Write-Host "Token: $token"
```

### Get Profile
```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:5000/api/users/profile" -Headers $headers
```

### Create Task
```powershell
$headers = @{ Authorization = "Bearer $token" }
$body = @{
    title = "Test Task"
    description = "This is a test task"
    status = "pending"
    due_date = "2026-12-31"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/tasks" -Method POST -ContentType "application/json" -Headers $headers -Body $body
```

### Get All Tasks
```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:5000/api/tasks" -Headers $headers
```
