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
- Entity Framework Core
- SQLite Database

## 📋 Prerequisites

- Node.js 20.x or higher
- .NET 8.0 SDK
- Git

## 🔧 Local Development Setup

### Backend Setup

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

### Using Docker Compose (Recommended)

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

**Backend:**
```bash
cd ComplaintApi
docker build -t complaint-api .
docker run -p 5000:8080 complaint-api
```

**Frontend:**
```bash
cd hcl4
docker build -t complaint-frontend .
docker run -p 4200:80 complaint-frontend
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
Automatically runs on push/PR to main/master/develop:
- Builds and tests backend
- Builds and tests frontend
- Creates deployment artifacts

#### 2. **Docker Build** (`.github/workflows/docker-build.yml`)
Builds and pushes Docker images to GitHub Container Registry:
- Triggered on push to main/master or version tags
- Creates container images for both services

#### 3. **Azure Deployment** (`.github/workflows/deploy-azure.yml`)
Deploys to Azure services (requires configuration):
- Backend: Azure Web App
- Frontend: Azure Static Web Apps

### Setting Up CI/CD

1. **Enable GitHub Actions:**
   - Push code to your repository
   - GitHub Actions will automatically run

2. **Configure Secrets (for deployment):**
   Go to Settings → Secrets and variables → Actions, and add:
   - `AZURE_BACKEND_PUBLISH_PROFILE` - Backend publish profile
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` - Frontend deployment token

3. **Docker Registry Access:**
   - Automatic for GitHub Container Registry (uses GITHUB_TOKEN)

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/           # GitHub Actions CI/CD pipelines
├── ComplaintApi/            # .NET Backend
│   ├── Controllers/         # API endpoints
│   ├── Data/               # Database context
│   ├── Models/             # Data models
│   ├── Dockerfile          # Backend container config
│   └── Program.cs          # App configuration
├── hcl4/                   # Angular Frontend
│   ├── src/
│   │   └── app/
│   │       ├── components/ # UI components
│   │       ├── models/     # TypeScript interfaces
│   │       └── services/   # API services
│   ├── Dockerfile          # Frontend container config
│   └── nginx.conf          # Nginx configuration
└── docker-compose.yml      # Multi-container orchestration
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

### Option 1: Docker Compose
```bash
docker-compose up -d
```

### Option 2: Manual Deployment
Deploy backend and frontend separately to your hosting provider

### Option 3: Azure
Use the provided Azure deployment workflow

### Option 4: AWS/GCP
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

**Backend (`appsettings.json` or Environment):**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=complaints.db"
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
