# 🚀 Deployment Guide

This guide will walk you through deploying your Task Management System to production.

## 📋 Table of Contents

1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Alternative Options](#alternative-options)
4. [Post-Deployment Testing](#post-deployment-testing)

---

## 🔧 Backend Deployment (Render)

### Prerequisites

- GitHub repository with your code (✅ Already done)
- MongoDB Atlas database (✅ Already configured)
- Render account (free tier available)

### Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with GitHub account (easiest option)
4. Authorize Render to access your GitHub repositories

### Step 2: Create New Web Service

1. From Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `badaloraon_BTECH_10738_22`
3. Configure the service:

   ```
   Name: task-management-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

### Step 3: Add Environment Variables

In the "Environment" section, add these variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://newbadal06_db_user:zrOBRbwAGOEdji2z@cluster0.qdgaamu.mongodb.net/task_management
JWT_SECRET=badal_oraon_task_management_jwt_secret_key_2026_secure
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Note:** You'll update `CLIENT_URL` after deploying frontend in next section.

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait 3-5 minutes for deployment to complete
4. Your backend URL will be: `https://task-management-backend.onrender.com`

### Step 5: Test Backend

Open your browser and test:

```
https://task-management-backend.onrender.com/api/auth/signup
```

You should see a POST endpoint response (even if method not allowed, it means server is running).

---

## 🎨 Frontend Deployment (Vercel)

### Prerequisites

- Vercel account (free tier available)
- Backend deployed and URL noted

### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Start Deploying"** or **"Sign Up"**
3. Sign up with GitHub account
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. From Vercel dashboard, click **"Add New"** → **"Project"**
2. Import `badaloraon_BTECH_10738_22` repository
3. Configure project:

   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Step 3: Add Environment Variable

In "Environment Variables" section:

```
VITE_API_URL=https://task-management-backend.onrender.com/api
```

Replace with your actual backend URL from Render.

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build your React app
   - Deploy to CDN
3. Wait 2-3 minutes
4. Your frontend URL will be: `https://task-management-badal.vercel.app` (or similar)

### Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Update environment variable:
   ```
   CLIENT_URL=https://task-management-badal.vercel.app
   ```
4. Replace with your actual Vercel URL
5. Service will auto-redeploy

### Step 6: Update CORS in Code (Optional but Recommended)

For better security, update backend CORS configuration:

1. In GitHub, edit `backend/src/server.js`
2. Update CORS origin:
   ```javascript
   const corsOptions = {
     origin: process.env.CLIENT_URL || "http://localhost:5173",
     credentials: true,
   };
   app.use(cors(corsOptions));
   ```
3. Commit and push
4. Render will auto-deploy the changes

---

## 🔄 Alternative Options

### Backend Alternatives

#### Railway (Recommended Alternative)

1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select `badaloraon_BTECH_10738_22`
5. Add service from **"backend"** folder
6. Add environment variables (same as Render)
7. Railway provides: `https://your-app.railway.app`

#### Heroku

1. Go to [https://heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub repository
4. Set buildpack to Node.js
5. Configure environment variables
6. Enable automatic deploys from main branch

### Frontend Alternatives

#### Netlify

1. Go to [https://netlify.com](https://netlify.com)
2. Import GitHub repository
3. Configure:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```
4. Add environment variable: `VITE_API_URL`
5. Deploy

#### GitHub Pages (Static Only)

Not recommended for this project as it requires additional configuration for React Router.

---

## ✅ Post-Deployment Testing

### 1. Test Backend API

Open your backend URL in browser or use PowerShell:

```powershell
# Test signup
Invoke-RestMethod -Uri "https://your-backend-url.onrender.com/api/auth/signup" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### 2. Test Frontend

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Try to sign up a new account
3. Login with your credentials
4. Create a task
5. Drag task between columns
6. Test on mobile device (responsive check)

### 3. Check Browser Console

Press F12 and check Console tab:

- ✅ No CORS errors
- ✅ API requests succeeding
- ✅ No 404 errors

### 4. Test API Endpoints

From your deployed frontend:

- ✅ Signup works
- ✅ Login works
- ✅ Create task works
- ✅ Update task works
- ✅ Delete task works
- ✅ Profile update works

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error

**Error:** "Access to fetch blocked by CORS policy"

**Solution:**

1. Check `CLIENT_URL` in backend environment variables
2. Must match exact frontend URL (including https://)
3. No trailing slash in URL

### Issue 2: API Requests Failing

**Error:** "Failed to fetch" or "Network error"

**Solution:**

1. Verify `VITE_API_URL` in frontend environment variables
2. Must include `/api` at the end
3. Check backend is actually running on Render

### Issue 3: Backend Keeps Sleeping (Render Free Tier)

**Issue:** Backend goes to sleep after 15 minutes of inactivity

**Solution:**

- First request will be slow (cold start ~30 seconds)
- This is normal for free tier
- Upgrade to paid tier ($7/month) for always-on service
- Or use a ping service to keep it awake

### Issue 4: Environment Variables Not Working

**Solution:**

1. Check spelling of variable names
2. Restart service after adding variables
3. For Vite, variables must start with `VITE_`
4. Rebuild frontend if variables changed

### Issue 5: MongoDB Connection Failed

**Solution:**

1. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0 for cloud deployment)
2. Verify connection string in environment variables
3. Check MongoDB Atlas cluster is running

---

## 📊 Monitoring & Maintenance

### Backend Monitoring (Render)

1. View logs: Render Dashboard → Your Service → Logs
2. Check metrics: CPU, Memory usage
3. Set up alerts for errors

### Frontend Monitoring (Vercel)

1. View deployment logs
2. Check Analytics for user traffic
3. Monitor Core Web Vitals

### Database Monitoring (MongoDB Atlas)

1. Login to MongoDB Atlas
2. Check cluster metrics
3. View slow queries
4. Monitor storage usage

---

## 💰 Cost Summary

### Free Tier Limits

| Service           | Free Tier       | Limitations                                        |
| ----------------- | --------------- | -------------------------------------------------- |
| **Render**        | 750 hours/month | Sleeps after 15 min inactivity, slower performance |
| **Vercel**        | Unlimited       | 100GB bandwidth, 100 builds/day                    |
| **MongoDB Atlas** | 512MB storage   | Shared cluster, basic performance                  |

### Upgrade Options

- **Render Starter:** $7/month (always-on, better performance)
- **Vercel Pro:** $20/month (more bandwidth, team features)
- **MongoDB M10:** $0.08/hour (~$57/month for dedicated cluster)

---

## 🎯 Next Steps After Deployment

1. ✅ Update README.md with live demo links
2. ✅ Test all features in production
3. ✅ Add screenshots to repository
4. ✅ Share deployment links with instructor
5. 📧 Submit assignment with:
   - GitHub repository link
   - Live backend URL
   - Live frontend URL
   - Screenshots of working application

---

## 🔗 Quick Links

- **Render:** https://render.com
- **Vercel:** https://vercel.com
- **Railway:** https://railway.app
- **Netlify:** https://netlify.com
- **MongoDB Atlas:** https://cloud.mongodb.com

---

## 📞 Need Help?

If you encounter issues:

1. Check service logs (most informative)
2. Verify environment variables
3. Test API endpoints individually
4. Check CORS configuration
5. Review deployment documentation

Good luck with your deployment! 🚀
