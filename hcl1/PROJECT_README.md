# Employee Resource Management System

A complete full-stack web application for managing employees, projects, and resource allocations built with Angular and ASP.NET Core.

## Features

### Employee Management
- Add, edit, delete, and view employees
- Filter employees by department
- Role-based access (Admin, Manager, Employee)
- Track employee details including name, email, phone, department, designation, and joining date

### Project Management
- Create and manage projects
- Filter projects by status (Active, Completed, On Hold)
- Track project details including name, description, dates, manager, and client

### Resource Allocation
- Allocate employees to projects with percentage allocation
- Track allocation and release dates
- Add remarks for each allocation
- View all allocations with employee and project details

## Technology Stack

### Frontend
- **Angular 21** - Modern SPA framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **CSS3** - Custom styling

### Backend
- **ASP.NET Core 10** - RESTful Web API
- **Entity Framework Core 10** - ORM for database operations
- **SQLite** - Lightweight database

## Project Structure

```
hcl1/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── employee-list/
│   │   │   ├── project-list/
│   │   │   └── allocation-list/
│   │   ├── models/
│   │   │   ├── employee.model.ts
│   │   │   ├── project.model.ts
│   │   │   └── allocation.model.ts
│   │   ├── services/
│   │   │   ├── employee.service.ts
│   │   │   ├── project.service.ts
│   │   │   └── allocation.service.ts
│   │   └── app.ts
│   └── index.html
├── EmployeeResourceAPI/
│   ├── Controllers/
│   │   ├── EmployeesController.cs
│   │   ├── ProjectsController.cs
│   │   └── AllocationsController.cs
│   ├── Models/
│   │   ├── Employee.cs
│   │   ├── Project.cs
│   │   └── Allocation.cs
│   ├── DTOs/
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   └── Program.cs
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)
- .NET 10 SDK

### Installation

1. **Clone the repository**
   ```bash
   cd hcl1
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Restore Backend Dependencies**
   ```bash
   cd EmployeeResourceAPI
   dotnet restore
   ```

### Running the Application

1. **Start the Backend API** (Terminal 1)
   ```bash
   cd EmployeeResourceAPI
   dotnet run --urls "http://localhost:5000"
   ```
   The API will be available at: http://localhost:5000

2. **Start the Frontend Application** (Terminal 2)
   ```bash
   npm start
   ```
   The Angular app will be available at: http://localhost:4200

### Default Data

The application comes with sample data:
- **Employees**: John Admin, Sarah Manager, Mike Developer, Lisa Designer
- **Projects**: Employee Management System, E-Commerce Platform
- **Allocations**: Various allocations across projects

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `GET /api/employees/department/{department}` - Get employees by department
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/status/{status}` - Get projects by status
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Allocations
- `GET /api/allocations` - Get all allocations
- `GET /api/allocations/{id}` - Get allocation by ID
- `GET /api/allocations/employee/{employeeId}` - Get allocations by employee
- `GET /api/allocations/project/{projectId}` - Get allocations by project
- `POST /api/allocations` - Create new allocation
- `PUT /api/allocations/{id}` - Update allocation
- `DELETE /api/allocations/{id}` - Delete allocation

## Database

The application uses SQLite for data persistence. The database file (`employeeresource.db`) is automatically created in the EmployeeResourceAPI directory on first run.

## Development

### Frontend Development
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
```

### Backend Development
```bash
dotnet watch run   # Start with hot reload
dotnet build       # Build the project
dotnet test        # Run tests
```

## CORS Configuration

The backend API is configured to accept requests from `http://localhost:4200`. Update the CORS policy in `Program.cs` if deploying to a different domain.

## Features Implemented per SRS

✅ Employee CRUD operations
✅ Project CRUD operations  
✅ Resource Allocation management
✅ Role-based employee types (Admin, Manager, Employee)
✅ Department filtering
✅ Project status tracking
✅ Allocation percentage tracking
✅ RESTful API with proper HTTP methods
✅ SQLite database with EF Core
✅ Angular SPA with standalone components
✅ Responsive UI design
✅ CORS enabled for local development

## Access the Application

Once both servers are running:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000

Navigate through the menu to access:
- Employees - Manage employee records
- Projects - Manage project information  
- Allocations - Manage resource allocations

## License

This project is licensed under the MIT License.
