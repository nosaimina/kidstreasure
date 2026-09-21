# Monorepo & Deployment Guide

This repository is structured as an **npm workspaces monorepo**:
- `apps/client`: React 19 + Vite frontend
- `apps/server`: Express 5 + Mongoose backend

---

## Local Development (Monorepo)

From the root of the repository:
```bash
# Install dependencies across all workspaces
npm install

# Run both Client and Server concurrently
npm run dev

# Run only Client (Vite)
npm run dev:client

# Run only Server (Express)
npm run dev:server

# Build all workspaces
npm run build

# Lint client workspace
npm run lint
```

---

## GitHub Environment & CI/CD Setup

### 1. GitHub Actions CI
The CI workflow (`.github/workflows/ci.yml`) automatically runs on every push and pull request to `main`:
- Runs automated checks on Node.js 20.x and 22.x
- Performs `npm run lint` across workspaces
- Builds `apps/client` with `npm run build`
- Verifies build output

### 2. GitHub Environments & Deployment Hook
The repository includes a production deployment workflow (`.github/workflows/deploy.yml`):
1. In your GitHub repository, navigate to **Settings** > **Environments**.
2. Click **New environment** and name it `production`.
3. (Optional) Under **Environment protection rules**, configure deployment branches (e.g., restrict to `main`).
4. Under **Environment secrets**, add:
   - `RENDER_DEPLOY_HOOK_URL`: (Optional) Your Render service deploy hook URL (found in Render Web Service Settings > Deploy Hook).

---

## Deployment Options

### Option 1: Unified Fullstack on Render (Recommended & Simplest)

Since Render can build your React frontend (`apps/client/dist/`) and run the Express backend (`apps/server/index.js`), you only need **one single Render Web Service** to host everything.

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** > **Web Service**.
3. Select your GitHub repository.
4. Fill in the service configuration:
   - **Name**: `fabulous-kiddies-app`
   - **Region**: Nearest to your users
   - **Branch**: `main`
   - **Root Directory**: *(leave blank)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Under **Environment Variables**, add:
   - `MONGODB_URI`: *Your MongoDB Atlas connection string*
   - `NODE_ENV`: `production`
6. Click **Deploy Web Service**.

Both the client app and `/api` endpoints will be served from the single domain.

---

### Option 2: Separate Backend (Render) + Frontend (Vercel)

If you prefer to host your frontend on **Vercel** and backend on **Render**:

1. **Deploy Backend on Render**:
   - Create a Web Service for the repository.
   - **Root Directory**: `apps/server` (or leave root and set start command `npm run server`).
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set `MONGODB_URI` and `NODE_ENV=production`.
   - Your API will be live at `https://your-backend.onrender.com`.

2. **Deploy Frontend on Vercel**:
   - Import your GitHub repo on Vercel.
   - Set **Root Directory** to `apps/client`.
   - Framework Preset: `Vite`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Add Environment Variable:
     - `VITE_API_URL`: `https://your-backend.onrender.com`
   - Deploy.
