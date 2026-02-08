# Complaint & Issue Tracking Portal

A full-stack complaint management system built with Angular and .NET Web API.

## 🚀 Features

- **User Features**
  - Register complaints with category and priority
  - Track complaint status (Open → In Progress → Resolved)
  - Add comments to complaints
  - Search and filter complaints
  - View detailed complaint information

- **Admin Features**
  - Dashboard with statistics
  - Update complaint statuses
  - Manage all complaints
  - View analytics

## 🛠️ Tech Stack

**Frontend:**
- Angular 21.1.0 (Standalone Components)
- TypeScript
- Reactive Forms
- Signals for state management

**Backend:**
- .NET 8.0 Web API
- Azure Data Tables SDK
- Azure Table Storage (Cloud NoSQL)

**Cloud Infrastructure:**
- Azure App Service (F1 Free Tier) - Backend
- Azure Static Web Apps (Free) - Frontend
- Azure Table Storage (Free) - Database

## 📋 Prerequisites

- Node.js 20.x or higher
- .NET 8.0 SDK
- Git
- Azure account (for cloud deployment)
- Azure Storage Emulator (for local development) or Azure Storage Account

## 🔧 Local Development Setup

### Backend Setup

1. **Install Azure Storage Emulator** (for local testing)
   - Download and install [Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite)
   - Or use connection string to Azure Storage Account

2. **Update appsettings.json**
   ```json
   {
     "AzureTableStorage": {
       "ConnectionString": "UseDevelopmentStorage=true",
       "TableName": "Complaints"
     }
   }
   ```

3. **Run Backend**
   ```bash
   cd ComplaintApi
   dotnet restore
   dotnet run --urls "http://localhost:5000"
   ```

### Frontend Setup

```bash
cd hcl4
npm install
npm start
```

**Access the application:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000

## 🐳 Docker Setup

> **Note:** Docker support has been removed in favor of Azure-native deployment using Azure App Service and Azure Static Web Apps.

For containerized deployment, Azure Container Apps or Azure Container Instances can be configured separately.

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
Automatically runs on push/PR to main/master/develop:
- Builds and tests backend
- Builds and tests frontend
- Creates deployment artifacts

#### 2. **Azure Deployment** (`.github/workflows/azure-deployment.yml`)
Deploys to Azure services on push to main:
- **Backend**: Azure App Service (F1 Free Tier)
- **Frontend**: Azure Static Web Apps (Free)
- **Database**: Azure Table Storage (Free)

### Setting Up Azure Deployment

1. **Create Azure Resources:**
   - Azure App Service (F1 Free) for backend
   - Azure Static Web Apps for frontend
   - Azure Storage Account for Table Storage

2. **Configure GitHub Secrets:**
   Go to Settings → Secrets and variables → Actions, add:
   - `AZURE_WEBAPP_PUBLISH_PROFILE` - Download from Azure App Service
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` - Get from Azure Static Web Apps
   - `AZURE_STORAGE_CONNECTION_STRING` - From Azure Storage Account

3. **Update Workflow:**
   - Edit `.github/workflows/azure-deployment.yml`
   - Update `AZURE_WEBAPP_NAME` with your App Service name

4. **Push to GitHub:**
   - Pipeline will automatically deploy to Azure

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/           # GitHub Actions CI/CD pipelines
├── ComplaintApi/            # .NET Backend
│   ├── Controllers/         # API endpoints
│   ├── Services/           # Azure Table Storage service
│   ├── Models/             # Data models
│   ├── appsettings.json    # Configuration
│   └── Program.cs          # App configuration
├── hcl4/                   # Angular Frontend
│   ├── src/
│   │   └── app/
│   │       ├── components/ # UI components
│   │       ├── models/     # TypeScript interfaces
│   │       └── services/   # API services
│   └── angular.json        # Angular config
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | Get all complaints (with filters) |
| GET | `/api/complaints/{id}` | Get complaint by ID |
| POST | `/api/complaints` | Create new complaint |
| PUT | `/api/complaints/{id}/status` | Update complaint status |
| POST | `/api/complaints/{id}/comments` | Add comment to complaint |
| DELETE | `/api/complaints/{id}` | Delete complaint |

**Query Parameters:**
- `category` - Filter by category
- `status` - Filter by status
- `search` - Search in title/description

## 🚢 Deployment Options

### Option 1: Azure (Recommended - Free Tier)
```bash
# Automated via GitHub Actions
# Just push to main branch
git push origin main
```

### Option 2: Manual Azure Deployment
Follow the detailed guide in [DEPLOYMENT.md](DEPLOYMENT.md)

### Option 3: AWS/GCP
Modify the deployment workflow for your cloud provider

## 🧪 Testing

**Backend Tests:**
```bash
cd ComplaintApi
dotnet test
```

**Frontend Tests:**
```bash
cd hcl4
npm test
```

## 📝 Environment Variables

**Backend (`appsettings.json` or Azure Configuration):**
```json
{
  "AzureTableStorage": {
    "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=YOUR_ACCOUNT;AccountKey=YOUR_KEY;EndpointSuffix=core.windows.net",
    "TableName": "Complaints"
  }
}
```

**Frontend (`environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

**For Azure Production:**
- Backend: Set `AzureTableStorage:ConnectionString` in App Service Configuration
- Frontend: Update `apiUrl` to your Azure App Service URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

[Sid770](https://github.com/Sid770)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Microsoft for .NET and Entity Framework Core
- GitHub Actions for CI/CD automation
