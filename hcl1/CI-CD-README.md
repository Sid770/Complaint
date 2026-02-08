# CI/CD Pipeline Documentation

## 🚀 Employee Resource Management System - CI/CD Pipeline

This project includes a comprehensive GitHub Actions CI/CD pipeline that automates building, testing, and deployment across multiple environments.

### 📋 Pipeline Overview

The CI/CD workflow is triggered on:
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches
- **Manual workflow dispatch**

### 🔧 Pipeline Jobs

#### 1. **Backend Build & Test** (`backend`)
- Sets up .NET 10.0 environment
- Restores NuGet dependencies
- Builds the ASP.NET Core Web API
- Runs unit tests
- Publishes build artifacts
- **Duration**: ~2-3 minutes

#### 2. **Frontend Build & Test** (`frontend`)
- Sets up Node.js 20.x environment
- Installs npm dependencies
- Runs ESLint for code quality
- Executes Angular tests with headless Chrome
- Builds production bundle
- Uploads frontend artifacts
- **Duration**: ~3-4 minutes

#### 3. **Development Deployment** (`dev`)
- **Depends on**: backend, frontend
- Downloads build artifacts
- Deploys to development environment
- Runs health checks
- **Environment URL**: https://dev-emp-resource.example.com

#### 4. **Staging Deployment** (`staging`)
- **Depends on**: dev
- Downloads build artifacts
- Deploys to staging environment
- Runs smoke tests
- Performs integration testing
- Runs comprehensive health checks
- **Environment URL**: https://staging-emp-resource.example.com

#### 5. **Production Deployment** (`production`)
- **Depends on**: staging
- **Condition**: Only runs on `main` branch
- Creates production backup
- Deploys to production environment
- Runs post-deployment tests
- Performs load balancer health checks
- Sends deployment notifications
- **Environment URL**: https://emp-resource.example.com

#### 6. **Deployment Summary** (`deployment-summary`)
- **Depends on**: All jobs
- **Condition**: Always runs (even if previous jobs fail)
- Generates comprehensive deployment report
- Shows status of all jobs
- Provides audit trail

### 🌳 Branch Strategy

```
main (production)
  ├── develop (development/staging)
  ├── feature/* (feature branches)
  └── hotfix/* (emergency fixes)
```

- **main**: Production-ready code, triggers full pipeline including production deployment
- **develop**: Active development, triggers dev and staging deployments
- **feature/***: Individual features, triggers backend and frontend builds only
- **hotfix/***: Emergency fixes, can be merged directly to main

### 📊 Pipeline Flow

```
┌─────────────┐     ┌─────────────┐
│   Backend   │     │  Frontend   │
│Build & Test │     │Build & Test │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └───────┬───────────┘
               │
       ┌───────▼────────┐
       │   Development  │
       │   Deployment   │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │     Staging    │
       │   Deployment   │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │   Production   │
       │  Deployment    │ (main branch only)
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │   Deployment   │
       │    Summary     │
       └────────────────┘
```

### 🔐 Environment Protection Rules

GitHub Environments are configured with:
- **development**: No approval required
- **staging**: Optional approval
- **production**: Required approval from repository maintainers

### 📦 Artifacts

Build artifacts are retained for **30 days** and include:
- **Backend artifacts**: Compiled .NET application, DLLs, configuration files
- **Frontend artifacts**: Optimized Angular bundles, assets, static files

### 🧪 Testing Strategy

- **Backend**: Unit tests with xUnit/NUnit
- **Frontend**: Unit tests with Jasmine/Karma, E2E tests (optional)
- **Staging**: Smoke tests, integration tests
- **Production**: Post-deployment verification tests

### 🚦 Status Badges

Add these badges to your README:

```markdown
![Backend Build](https://github.com/Sid770/emp_resource_mange/workflows/Employee%20Resource%20Management%20CI/CD/badge.svg?branch=main)
![Frontend Build](https://github.com/Sid770/emp_resource_mange/workflows/Employee%20Resource%20Management%20CI/CD/badge.svg?branch=develop)
```

### 📝 Workflow File Location

`.github/workflows/ci-cd.yml`

### 🔄 Triggering the Pipeline

1. **Automatic**: Push code to `main` or `develop` branch
   ```bash
   git push origin main
   ```

2. **Manual**: Go to Actions tab → Select workflow → Click "Run workflow"

3. **Pull Request**: Create PR to `main` or `develop`

### 📈 Monitoring & Logs

- View pipeline execution: `https://github.com/Sid770/emp_resource_mange/actions`
- Each job provides detailed logs
- Download artifacts from successful builds

### 🛠️ Local Testing

Before pushing, test locally:

```bash
# Backend
cd EmployeeResourceAPI
dotnet build
dotnet test
dotnet publish -c Release

# Frontend
npm install
npm run lint
npm run test
npm run build
```

### 🔧 Customization

To modify the pipeline:
1. Edit `.github/workflows/ci-cd.yml`
2. Update environment URLs in the workflow file
3. Configure actual deployment scripts in job steps
4. Set up secrets in GitHub repository settings

### 🎯 Success Criteria

All jobs must complete successfully for a deployment to be considered successful:
- ✅ Backend builds without errors
- ✅ Frontend builds without errors
- ✅ All tests pass
- ✅ Development deployment succeeds
- ✅ Staging deployment and tests pass
- ✅ Production deployment (main branch only) completes
- ✅ All health checks pass

### 📞 Support

For issues with the CI/CD pipeline, contact the DevOps team or create an issue in the repository.

---

**Last Updated**: December 24, 2025  
**Pipeline Version**: 1.0  
**Maintained by**: Sid770
