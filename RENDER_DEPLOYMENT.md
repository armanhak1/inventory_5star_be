# 🚀 Deploy Backend to Render.com

## Your Frontend is Live!
**URL:** https://5star-inventory.netlify.app/

Now let's deploy your backend to Render.com!

---

## 📋 Step-by-Step Deployment

### Step 1: Go to Render
Visit: **https://render.com**

### Step 2: Sign In
- Click **"Get Started"** or **"Sign In"**
- Sign in with **GitHub**

### Step 3: Create New Web Service
- Click **"New +"** (top right)
- Select **"Web Service"**

### Step 4: Connect Repository
- Click **"Connect repository"**
- Find and select: **`inventory_5star_be`**
- Click **"Connect"**

### Step 5: Configure Service

Render will auto-detect settings, but verify these:

**Name:** `5star-inventory-backend` (or your choice)

**Region:** Choose closest to you (e.g., Oregon, Frankfurt)

**Branch:** `main`

**Root Directory:** Leave blank

**Runtime:** `Node`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

### Step 6: Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these variables:

#### Variable 1: MONGODB_URI
- **Key:** `MONGODB_URI`
- **Value:**
```
mongodb+srv://armanhakobyan755_db_user:FfMLXXLGR9At1Pc3@cluster0.ttkiz68.mongodb.net/five-star-care?retryWrites=true&w=majority&appName=Cluster0
```

#### Variable 2: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`

### Step 7: Select Plan
- Choose **"Free"** plan (perfect for this project)
- Free tier includes:
  - 512 MB RAM
  - Shared CPU
  - Auto-sleep after 15 min inactivity
  - Free SSL certificate

### Step 8: Create Web Service
- Click **"Create Web Service"**
- Render will start building and deploying!

**Wait 3-5 minutes** for deployment to complete.

---

## 🔗 Get Your Backend URL

After deployment succeeds, you'll see:

**Your service URL:** `https://5star-inventory-backend.onrender.com`

Or something like: `https://5star-inventory-backend-abc123.onrender.com`

**Copy this URL!** You'll need it for the next step.

---

## 🌐 Connect Frontend to Backend

### Update Netlify Environment Variable

1. **Go to Netlify:** https://app.netlify.com
2. **Select your site:** 5star-inventory
3. **Go to:** Site settings → Environment variables
4. **Click:** "Add a variable"
5. **Add:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://YOUR-RENDER-URL.onrender.com/api`
   
   Example:
   ```
   https://5star-inventory-backend.onrender.com/api
   ```

6. **Click "Save"**

7. **Redeploy Frontend:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"**
   - Select **"Clear cache and deploy site"**

---

## ⚠️ Important: MongoDB Atlas Network Access

**Your backend needs to access MongoDB!**

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com
2. **Click:** Network Access (left sidebar)
3. **Click:** "Add IP Address"
4. **Select:** "Allow Access from Anywhere" (0.0.0.0/0)
   - This allows Render servers to connect
5. **Click:** "Confirm"

**Without this, your backend won't connect to MongoDB!**

---

## 🧪 Test Your Deployment

### Step 1: Test Backend API
```bash
curl https://YOUR-RENDER-URL.onrender.com/api/inventory
```

**Expected:** JSON response with your 39 items

### Step 2: Test Frontend
1. Visit: https://5star-inventory.netlify.app/
2. Should load all 39 items
3. Try adding, editing, deleting items
4. Try exporting CSV
5. Everything should work!

---

## 🔄 Auto-Deploy Enabled

After initial deployment:
- ✅ Push to GitHub → Render auto-deploys
- ✅ See build logs in Render dashboard
- ✅ Rollback to previous versions anytime

---

## ⚡ Render Free Tier Notes

**Features:**
- ✅ 512 MB RAM (enough for your app)
- ✅ Free SSL certificate (HTTPS)
- ✅ Auto-deploy from GitHub
- ✅ 750 hours/month

**Limitations:**
- ⚠️ Auto-sleeps after 15 min inactivity
- ⚠️ Cold start takes ~30 seconds when waking up
- ⚠️ Limited to 750 hours/month

**Solution for Sleep:**
- Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 10 minutes (keeps it awake)

---

## 🔍 Troubleshooting

### Build Fails
**Check:** Build logs in Render dashboard
**Common issue:** Missing dependencies
**Solution:** Verify package.json is correct

### Can't Connect to MongoDB
**Check:** MongoDB Network Access whitelist
**Solution:** Allow access from anywhere (0.0.0.0/0)

### CORS Errors
**Check:** CORS settings in src/index.ts
**Solution:** Already updated! Includes your Netlify URL ✅

### Backend is Slow
**Cause:** Free tier auto-sleeps
**Solution:** 
- Accept the cold start delay
- Or upgrade to paid plan ($7/month)
- Or use UptimeRobot to keep it awake

---

## 📊 Deployment Checklist

- [x] CORS updated for Netlify
- [x] render.yaml created
- [x] .env.example added
- [ ] Push changes to GitHub
- [ ] Go to render.com
- [ ] Create new Web Service
- [ ] Connect repository
- [ ] Add environment variables
- [ ] Deploy
- [ ] Get backend URL
- [ ] Add backend URL to Netlify
- [ ] Redeploy Netlify
- [ ] Whitelist IPs in MongoDB Atlas
- [ ] Test everything

---

## 🎯 Summary of Changes Needed

**Backend (already done):**
- ✅ CORS includes `https://5star-inventory.netlify.app`
- ✅ render.yaml configuration file
- ✅ .env.example template

**What You Need to Do:**
1. Push changes to GitHub
2. Deploy to Render.com
3. Get backend URL
4. Add URL to Netlify env vars
5. Whitelist IPs in MongoDB

---

## 🚀 Quick Deployment Steps

```bash
# 1. Push to GitHub
cd /Users/inspirovatecreatives/Desktop/5stat_be
git add .
git commit -m "Add Render deployment config"
git push

# 2. Go to Render
# https://render.com

# 3. Create Web Service
# Select inventory_5star_be repo

# 4. Add environment variables
# MONGODB_URI = your-connection-string
# NODE_ENV = production

# 5. Deploy!
```

---

## 🎉 After Deployment

Your complete system will be:
- ✅ **Frontend:** https://5star-inventory.netlify.app/
- ✅ **Backend:** https://your-app.onrender.com
- ✅ **Database:** MongoDB Atlas (cloud)

**All connected and live on the internet!** 🌐

---

**Ready to deploy? Go to https://render.com and follow the steps above!** 🚀

