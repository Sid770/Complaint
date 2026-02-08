# Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- GitHub account
- Docker installed (optional)
- Cloud provider account (Azure/AWS/GCP - optional)

## 📦 Step 1: Push to GitHub

```bash
cd "b:\OneDrive - Amity University\Desktop\CRUD"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add CI/CD pipeline with SQLite database"

# Add your remote repository (replace with your repo URL)
git remote add origin https://github.com/Sid770/Complaint.git

# Push to GitHub
git push -u origin main
```

## ✅ Step 2: Verify CI/CD Pipeline

After pushing to GitHub:

1. Go to your repository: https://github.com/Sid770/Complaint
2. Click on **Actions** tab
3. You should see workflows running:
   - ✅ CI/CD Pipeline (builds and tests)
   - ✅ Docker Build (creates container images)

## 🐳 Step 3: Deploy with Docker

### Local Docker Testing

```bash
# Build and run with Docker Compose
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access:**
- Frontend: http://localhost:4200
- Backend: http://localhost:5000

### Docker Hub Deployment

```bash
# Tag images
docker tag complaint-api:latest yourusername/complaint-api:latest
docker tag complaint-frontend:latest yourusername/complaint-frontend:latest

# Push to Docker Hub
docker push yourusername/complaint-api:latest
docker push yourusername/complaint-frontend:latest
```

## ☁️ Step 4: Cloud Deployment Options

### Option A: Azure Deployment

#### Backend (Azure Web App)

1. Create Azure Web App:
```bash
az webapp create --name complaint-api-yourname \
  --resource-group YourResourceGroup \
  --plan YourAppServicePlan \
  --runtime "DOTNET|8.0"
```

2. Get publish profile:
   - Go to Azure Portal
   - Navigate to your Web App
   - Click "Download publish profile"

3. Add to GitHub Secrets:
   - Go to Settings → Secrets → Actions
   - Add `AZURE_BACKEND_PUBLISH_PROFILE`
   - Paste the publish profile content

#### Frontend (Azure Static Web Apps)

1. Create Static Web App:
```bash
az staticwebapp create --name complaint-frontend \
  --resource-group YourResourceGroup \
  --location "Central US"
```

2. Get deployment token:
```bash
az staticwebapp secrets list --name complaint-frontend
```

3. Add to GitHub Secrets:
   - Add `AZURE_STATIC_WEB_APPS_API_TOKEN`

4. Update workflow file:
   - Edit `.github/workflows/deploy-azure.yml`
   - Update app names
   - Push changes

### Option B: AWS Deployment

#### Backend (AWS Elastic Beanstalk)

```bash
# Install EB CLI
pip install awsebcli

# Initialize
cd ComplaintApi
eb init -p "64bit Amazon Linux 2 v2.6.0 running .NET Core" complaint-api

# Create environment
eb create complaint-api-prod

# Deploy
eb deploy
```

#### Frontend (AWS S3 + CloudFront)

```bash
# Build frontend
cd hcl4
npm run build

# Deploy to S3
aws s3 sync dist/hcl4/browser/ s3://your-bucket-name --delete

# Create CloudFront distribution (via AWS Console)
```

### Option C: Google Cloud Platform

#### Backend (Cloud Run)

```bash
# Build and push to GCR
cd ComplaintApi
gcloud builds submit --tag gcr.io/PROJECT-ID/complaint-api

# Deploy to Cloud Run
gcloud run deploy complaint-api \
  --image gcr.io/PROJECT-ID/complaint-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Frontend (Firebase Hosting)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
cd hcl4
firebase init hosting

# Deploy
npm run build
firebase deploy --only hosting
```

### Option D: DigitalOcean

#### Using App Platform

1. Connect GitHub repository
2. Select branch (main)
3. Configure services:
   - Backend: Dockerfile path `ComplaintApi/Dockerfile`
   - Frontend: Dockerfile path `hcl4/Dockerfile`
4. Set environment variables
5. Deploy

### Option E: Heroku

#### Backend

```bash
# Login to Heroku
heroku login

# Create app
cd ComplaintApi
heroku create complaint-api-yourname

# Set buildpack
heroku buildpacks:set heroku/dotnet

# Deploy
git push heroku main
```

#### Frontend

```bash
# Create app
cd hcl4
heroku create complaint-frontend-yourname

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Add static buildpack
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static

# Deploy
git push heroku main
```

## 🔐 Environment Configuration

### Backend Environment Variables

For production deployment, set:

```bash
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:8080
ConnectionStrings__DefaultConnection=Data Source=/app/data/complaints.db
```

### Frontend Environment Variables

Update API URL in production build:

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.com'
};
```

## 🔄 Continuous Deployment

### Automatic Deployment on Push

The CI/CD pipeline automatically:
1. Runs tests
2. Builds applications
3. Creates Docker images
4. Deploys (if configured)

### Manual Deployment

Trigger manual deployment:
1. Go to GitHub Actions
2. Select workflow
3. Click "Run workflow"
4. Choose branch
5. Click "Run workflow"

## 📊 Monitoring

### Docker Logs

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Application Health

- Backend: http://your-backend-url/health
- Frontend: http://your-frontend-url

## 🐛 Troubleshooting

### Build Failures

1. Check GitHub Actions logs
2. Verify all dependencies are installed
3. Check for syntax errors
4. Ensure secrets are configured

### Deployment Failures

1. Verify cloud provider credentials
2. Check resource quotas
3. Review deployment logs
4. Validate environment variables

### Docker Issues

```bash
# Clean up
docker-compose down -v
docker system prune -a

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 📞 Support

- GitHub Issues: https://github.com/Sid770/Complaint/issues
- Documentation: See README.md

---

**Next Steps:**
1. ✅ Push code to GitHub
2. ✅ Verify CI/CD pipeline runs
3. ✅ Choose deployment platform
4. ✅ Configure secrets
5. ✅ Deploy application
6. ✅ Monitor and maintain
