# 🚀 Backend Deployment Guide

## Your Frontend is Live!
**URL:** https://5star-inventory.netlify.app/

Now let's deploy the backend to connect everything!

---

## ✅ What Needs to Change for Deployment

### 1. CORS Configuration
**Already updated!** Your backend now allows:
- ✅ `http://localhost:5173` (local development)
- ✅ `http://localhost:5174` (local development)
- ✅ `https://5star-inventory.netlify.app` (production) ⭐

### 2. Environment Variables
You'll need to set these in your deployment platform:
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Usually auto-set by platform (default: 3000)
- `NODE_ENV` - Set to "production"

---

## 🚀 Deploy to Railway (Recommended)

### Why Railway?
- ✅ Easy Node.js deployment
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Great for MongoDB apps
- ✅ Simple environment variables

### Steps:

#### 1. Go to Railway
Visit: https://railway.app

#### 2. Sign In
- Click "Login" → Sign in with GitHub

#### 3. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose: `inventory_5star_be`

#### 4. Add Environment Variables
Click "Variables" tab and add:

**MONGODB_URI:**
```
mongodb+srv://armanhakobyan755_db_user:FfMLXXLGR9At1Pc3@cluster0.ttkiz68.mongodb.net/five-star-care?retryWrites=true&w=majority&appName=Cluster0
```

**NODE_ENV:**
```
production
```

**PORT:**
```
3000
```

#### 5. Deploy
- Railway auto-detects Node.js
- Runs `npm install`
- Runs `npm run build`
- Starts with `npm start`
- Deploys automatically!

#### 6. Get Your URL
After deployment, you'll get a URL like:
```
https://inventory-5star-be-production.up.railway.app
```

**Copy this URL!**

---

## 🔗 Update Frontend with Backend URL

### Option 1: Update Netlify Environment Variable

1. Go to Netlify: https://app.netlify.com
2. Select your site: `5star-inventory`
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"**
5. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app/api`
6. **Save**
7. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### Option 2: Update config.ts and Redeploy

Edit `my-app/src/config.ts`:
```typescript
export const config = {
  API_URL: 'https://your-railway-url.up.railway.app/api',
  USE_API: true,
};
```

Then:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Netlify will auto-deploy.

---

## 🌐 Alternative: Deploy to Render

### Steps:

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect `inventory_5star_be` repository
5. Configure:
   - **Name:** 5star-inventory-backend
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
6. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
7. Click "Create Web Service"

---

## 📋 Backend Deployment Checklist

- [x] CORS updated for Netlify frontend
- [x] .env.example created
- [x] railway.json added
- [x] render.yaml added
- [ ] Choose deployment platform (Railway/Render)
- [ ] Deploy backend
- [ ] Get backend URL
- [ ] Add backend URL to Netlify env vars
- [ ] Redeploy frontend
- [ ] Test everything together

---

## 🔒 Environment Variables You Need

### MONGODB_URI
Your MongoDB connection string:
```
mongodb+srv://armanhakobyan755_db_user:FfMLXXLGR9At1Pc3@cluster0.ttkiz68.mongodb.net/five-star-care?retryWrites=true&w=majority&appName=Cluster0
```

### NODE_ENV
```
production
```

### PORT
```
3000
```
(Railway/Render may auto-set this)

---

## 🧪 Test After Deployment

### 1. Test Backend API
```bash
curl https://your-backend-url.up.railway.app/api/inventory
```
Should return your 39 items!

### 2. Test Frontend Connection
Visit: https://5star-inventory.netlify.app/

Should:
- ✅ Load all 39 items
- ✅ Allow adding items
- ✅ Allow editing items
- ✅ Allow deleting items
- ✅ Export CSV
- ✅ All features working!

---

## 🔄 MongoDB Atlas - Whitelist Railway/Render

**Important:** Add Railway/Render to MongoDB allowed IPs:

1. Go to MongoDB Atlas
2. Click **Network Access**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add specific Railway/Render IPs
5. Click **Confirm**

Without this, your backend won't connect to MongoDB!

---

## 📊 Deployment Files Added

**Created:**
- ✅ `railway.json` - Railway configuration
- ✅ `render.yaml` - Render configuration
- ✅ `.env.example` - Environment template
- ✅ `DEPLOYMENT.md` - This guide

**Updated:**
- ✅ `src/index.ts` - CORS includes Netlify URL

---

## 🎯 Quick Deploy (Railway - Fastest)

1. **Go to:** https://railway.app
2. **Login** with GitHub
3. **New Project** → Deploy from GitHub
4. **Select:** `inventory_5star_be`
5. **Add env vars:** MONGODB_URI, NODE_ENV=production
6. **Deploy** (automatic)
7. **Copy URL** (e.g., `https://your-app.up.railway.app`)
8. **Add to Netlify:** VITE_API_URL = `https://your-app.up.railway.app/api`
9. **Redeploy Netlify**

**Done!** ✅

---

## 🎉 Summary

**Frontend:** ✅ Deployed at https://5star-inventory.netlify.app/  
**Backend:** Ready to deploy (CORS updated)  
**Database:** ✅ MongoDB Atlas (39 items)

**Next:** Deploy backend to Railway/Render, then connect them!

---

**I recommend Railway - it's the fastest to set up!** 🚀

Visit: https://railway.app to deploy your backend now!
