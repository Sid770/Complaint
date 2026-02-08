# Deployment Guide - Vercel + Backend

## Current Status
- ✅ Frontend: Deployed on Vercel
- ❌ Backend: Not deployed (still on localhost)

## Problem
Your Vercel app can't connect to `http://localhost:5140` because localhost only works on your local machine.

## Solution: Deploy Backend to Cloud

### Option 1: Railway.app (Easiest - 5 minutes)

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `emp_resource_mange` repository
4. Click "Add variables" and set:
   - `ROOT_DIRECTORY`: `EmployeeResourceAPI`
5. Railway auto-detects .NET and deploys
6. Copy the generated URL (e.g., `https://emp-resource-api.railway.app`)
7. Update [`environment.prod.ts`](src/environments/environment.prod.ts):
   ```typescript
   apiUrl: 'https://emp-resource-api.railway.app/api'
   ```
8. Push to GitHub - Vercel will auto-rebuild

### Option 2: Render.com (Free Tier Available)

1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: `emp-resource-api`
   - **Root Directory**: `EmployeeResourceAPI`
   - **Environment**: `.NET`
   - **Build Command**: `dotnet publish -c Release -o out`
   - **Start Command**: `dotnet out/EmployeeResourceAPI.dll`
5. Click "Create Web Service"
6. Copy the URL (e.g., `https://emp-resource-api.onrender.com`)
7. Update [`environment.prod.ts`](src/environments/environment.prod.ts):
   ```typescript
   apiUrl: 'https://emp-resource-api.onrender.com/api'
   ```
8. Push to GitHub

### Option 3: Azure App Service (Microsoft)

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name emp-resource-rg --location eastus

# Create app service plan
az appservice plan create --name emp-resource-plan --resource-group emp-resource-rg --sku F1 --is-linux

# Create web app
az webapp create --name emp-resource-api-unique --resource-group emp-resource-rg --plan emp-resource-plan --runtime "DOTNETCORE:8.0"

# Deploy
cd EmployeeResourceAPI
az webapp up --name emp-resource-api-unique --resource-group emp-resource-rg
```

Then update [`environment.prod.ts`](src/environments/environment.prod.ts):
```typescript
apiUrl: 'https://emp-resource-api-unique.azurewebsites.net/api'
```

## After Backend Deployment

### 1. Update Frontend Environment

Edit [`src/environments/environment.prod.ts`](src/environments/environment.prod.ts):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-BACKEND-URL/api'  // Replace with actual URL
};
```

### 2. Push Changes to GitHub
```bash
git add .
git commit -m "Update production API URL for deployed backend"
git push origin main
```

Vercel will automatically rebuild and deploy with the new backend URL.

### 3. Set Environment Variable in Vercel (Alternative)

Instead of hardcoding, you can use Vercel environment variables:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - **Key**: `NG_APP_API_URL`
   - **Value**: `https://your-backend-url/api`
   - **Environment**: Production
4. Redeploy

Then update your code to read from environment variable.

## Database Consideration

⚠️ **Important**: Your SQLite database file won't persist on most cloud platforms. For production, you should:

1. **Use a hosted database**:
   - PostgreSQL: Supabase, Neon, Railway
   - MySQL: PlanetScale, Railway
   - SQL Server: Azure SQL Database

2. **Update connection string** in `appsettings.json`

3. **Install EF Core provider** for your chosen database

## Quick Fix for Testing

If you just want to test quickly, you can use **ngrok** to expose your local backend:

```bash
# Install ngrok
# Then run:
ngrok http 5140
```

This gives you a public URL like `https://abc123.ngrok.io` that you can use temporarily.

Update [`environment.prod.ts`](src/environments/environment.prod.ts):
```typescript
apiUrl: 'https://abc123.ngrok.io/api'
```

⚠️ This is only for testing - ngrok URLs expire after 2 hours on free plan.

## Verification

After deployment:
1. Test backend API directly: `https://your-backend-url/api/employees`
2. Check Vercel app can fetch data
3. Open browser DevTools → Network tab to see API calls

## Current Configuration

✅ **Services are using environment variables** - Ready for deployment!
✅ **CORS configured for Vercel** - Will accept requests from `*.vercel.app`
✅ **Environment files set up** - Just need to update production API URL

Next step: **Choose a backend hosting platform and deploy!**
