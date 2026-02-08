# Azure Deployment Guide - Free Tier Only

Complete guide to deploy your Complaint & Issue Tracking Portal to Microsoft Azure using **100% FREE services**.

## 🎯 Architecture Overview

```
Browser
   ↓
Angular Frontend → Azure Static Web Apps (Free)
   ↓
.NET Web API → Azure App Service (F1 Free)
   ↓
Azure Table Storage (Free)
```

## 📋 Prerequisites

- ✅ Azure account ([Azure for Students](https://azure.microsoft.com/en-us/free/students/) recommended - $100 credit)
- ✅ GitHub account with your code pushed
- ✅ Azure CLI installed (optional but recommended)

## 🚀 Step-by-Step Deployment

### Part 1: Create Azure Storage Account (Database)

1. **Login to Azure Portal**
   - Go to [portal.azure.com](https://portal.azure.com)

2. **Create Storage Account**
   ```bash
   # Using Azure CLI (optional)
   az storage account create \
     --name complaintstorage \
     --resource-group complaint-rg \
     --location eastus \
     --sku Standard_LRS
   ```

   **Or via Portal:**
   - Search for "Storage accounts" → Click "Create"
   - **Resource Group**: Create new → `complaint-rg`
   - **Storage account name**: `complaintstorage[yourname]` (must be unique)
   - **Region**: East US (or closest to you)
   - **Performance**: Standard
   - **Redundancy**: Locally-redundant storage (LRS)
   - Click **Review + Create** → **Create**

3. **Get Connection String**
   - Go to your Storage Account
   - Left menu → **Access keys**
   - Copy **Connection string** from key1
   - Save it for later: `DefaultEndpointsProtocol=https;AccountName=...`

4. **Create Table**
   - In Storage Account → **Tables**
   - Click **+ Table**
   - Name: `Complaints`
   - Click **OK**

### Part 2: Deploy Backend to Azure App Service

1. **Create App Service**
   ```bash
   # Using Azure CLI
   az webapp create \
     --name complaint-api-[yourname] \
     --resource-group complaint-rg \
     --plan complaint-plan \
     --runtime "DOTNET|8.0"
   ```

   **Or via Portal:**
   - Search for "App Services" → Click "Create"
   - **Resource Group**: `complaint-rg`
   - **Name**: `complaint-api-[yourname]` (must be unique globally)
   - **Publish**: Code
   - **Runtime stack**: .NET 8 (LTS)
   - **Operating System**: Linux
   - **Region**: East US
   - **Pricing Plan**: 
     - Click "Create new" → Name: `complaint-plan`
     - Click "Change size" → **Dev/Test** → **F1** (Free)
   - Click **Review + Create** → **Create**

2. **Configure App Service**
   - Go to your App Service
   - Left menu → **Configuration**
   - Click **+ New application setting**
   - Add these settings:

   | Name | Value |
   |------|-------|
   | `AzureTableStorage__ConnectionString` | (Your connection string from Part 1) |
   | `AzureTableStorage__TableName` | `Complaints` |

   - Click **Save** → **Continue**

3. **Enable CORS**
   - Left menu → **CORS**
   - Add Allowed Origins:
     - `http://localhost:4200` (for testing)
     - Your Static Web App URL (will add later)
   - Check "Enable Access-Control-Allow-Credentials"
   - Click **Save**

4. **Download Publish Profile**
   - In your App Service overview
   - Click **Get publish profile** (top menu)
   - Save the downloaded `.PublishSettings` file

5. **Add to GitHub Secrets**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click **New repository secret**
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Paste entire content of the publish profile file
   - Click **Add secret**

### Part 3: Deploy Frontend to Azure Static Web Apps

1. **Create Static Web App**
   - Portal → Search "Static Web Apps" → Click "Create"
   - **Resource Group**: `complaint-rg`
   - **Name**: `complaint-frontend`
   - **Plan type**: Free
   - **Region**: East US 2
   - **Source**: GitHub
   - Click **Sign in with GitHub**
   - **Organization**: Your GitHub username
   - **Repository**: `Complaint`
   - **Branch**: `main`
   - **Build Presets**: Angular
   - **App location**: `/hcl4`
   - **Output location**: `dist/hcl4/browser`
   - Click **Review + Create** → **Create**

2. **Get Deployment Token**
   - Go to your Static Web App
   - Left menu → **Manage deployment token**
   - Copy the token
   - Add to GitHub Secrets:
     - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
     - Value: (paste token)

3. **Update Frontend API URL**
   - In your code, update `hcl4/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://complaint-api-[yourname].azurewebsites.net'
   };
   ```

### Part 4: Update GitHub Workflow

1. **Edit Workflow File**
   - Update `.github/workflows/azure-deployment.yml`
   - Change `AZURE_WEBAPP_NAME` to your App Service name:
   ```yaml
   env:
     AZURE_WEBAPP_NAME: complaint-api-[yourname]  # Your actual name
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Configure Azure deployment"
   git push origin main
   ```

3. **Monitor Deployment**
   - Go to GitHub → Actions tab
   - Watch the workflow run
   - Both backend and frontend should deploy successfully

### Part 5: Configure Backend CORS with Frontend URL

1. **Get Static Web App URL**
   - In Azure Portal → Your Static Web App
   - Copy the URL (e.g., `https://happy-grass-xxx.2.azurestaticapps.net`)

2. **Update App Service CORS**
   - Go to App Service → CORS
   - Add the Static Web App URL
   - Click **Save**

## ✅ Verification

1. **Test Backend API**
   - Open: `https://complaint-api-[yourname].azurewebsites.net/health`
   - Should return: `Healthy`

2. **Test Frontend**
   - Open: Your Static Web App URL
   - Should load the application
   - Try creating a complaint
   - Verify it appears in the list

3. **Check Azure Table Storage**
   - Portal → Storage Account → Tables → Complaints
   - You should see your test data

## 🔐 Security Best Practices

1. **Never commit connection strings to GitHub**
2. **Use App Service Configuration for secrets**
3. **Enable authentication for production** (optional)
4. **Set up custom domain** (optional)

## 💰 Cost Monitoring

All services are **FREE**:
- ✅ Azure App Service F1: FREE (60 CPU minutes/day)
- ✅ Azure Static Web Apps: FREE (100 GB bandwidth/month)
- ✅ Azure Table Storage: FREE (First 12 months with Azure for Students)

**Important Limits:**
- App Service F1: Max 60 minutes CPU time per day
- Static Web Apps: 2 custom domains max
- Table Storage: 5 GB data

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check logs
az webapp log tail --name complaint-api-[yourname] --resource-group complaint-rg
```

### Frontend Build Fails
- Check GitHub Actions logs
- Ensure `AZURE_STATIC_WEB_APPS_API_TOKEN` is set correctly

### CORS Errors
- Verify App Service CORS settings include your frontend URL
- Check browser console for exact error

### No Data Displaying
- Verify connection string in App Service Configuration
- Check Table Storage has `Complaints` table created
- Review App Service logs

## 📱 Next Steps

1. **Custom Domain** (Optional)
   - Add custom domain to Static Web Apps
   - Add SSL certificate (free with Azure)

2. **Monitoring**
   - Enable Application Insights (free tier)
   - Set up alerts

3. **Scaling**
   - Upgrade to paid tiers when needed
   - Enable autoscaling

## 🆘 Support Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Table Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/tables/)
- [GitHub Issues](https://github.com/Sid770/Complaint/issues)

---

**Congratulations! Your app is now live on Azure! 🎉**
