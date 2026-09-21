# Deployment Guide

This project is configured so you can host **both the Frontend and Backend together on Render as a single Web Service for free**, or separately (e.g. Backend on Render + Frontend on Vercel/Netlify).

---

## Option 1: Unified Fullstack on Render (Recommended & Simplest)

Since Render can build your React frontend (`dist/`) and run the Node/Express backend (`server/index.js`), you only need **one single Render Web Service** to host everything.

### Step 1: Prepare MongoDB Atlas
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Go to **Network Access** > **IP Access List**.
3. Click **Add IP Address** and choose **Allow Access From Anywhere (`0.0.0.0/0`)**.
   *(Required because Render uses dynamic server IPs).*

### Step 2: Deploy on Render
1. Push your repository to **GitHub**.
2. Log in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** > **Web Service**.
4. Select your GitHub repository.
5. Fill in the service configuration:
   - **Name**: `fabulous-kiddies-app` (or any name you choose)
   - **Region**: Nearest to your users (e.g. Frankfurt, Oregon, Ohio)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Under **Environment Variables**, add:
   - `MONGODB_URI`: *Your MongoDB connection string from `.env`*
   - `NODE_ENV`: `production`
7. Click **Deploy Web Service**.

Once deployed, your app will be live at `https://your-app-name.onrender.com`. Both the public contest page and `/admin/audit-log` will work on that same domain.

---

## Option 2: Separate Backend (Render) + Frontend (Vercel)

If you prefer to host your frontend on **Vercel** or **Netlify**:

1. **Deploy the Backend on Render**:
   - Create a Web Service for the repo.
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Set `MONGODB_URI`.
   - Your API will be live at `https://your-backend.onrender.com`.

2. **Deploy the Frontend on Vercel**:
   - Import your GitHub repo on Vercel.
   - Framework Preset: `Vite`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Add Environment Variable:
     - `VITE_API_URL`: `https://your-backend.onrender.com`
   - Deploy.
