# MongoDB Setup Guide for Employee Resource Management System

## ✅ What We've Done

Your project has been successfully migrated from SQLite to MongoDB! Here's what changed:

### 1. **Installed MongoDB Driver**
- Added MongoDB.Driver NuGet package (v3.5.2)
- Removed all SQLite and Entity Framework packages

### 2. **Updated Models**
- Changed ID type from `int` to `string` (MongoDB uses ObjectId)
- Added MongoDB attributes (`[BsonId]`, `[BsonRepresentation]`)
- Removed Entity Framework navigation properties

### 3. **Created MongoDB Service**
- New file: `Data/MongoDbService.cs`
- Replaced Entity Framework DbContext with MongoDB collections

### 4. **Updated Controllers**
- All controllers now use MongoDB queries instead of EF Core
- Updated CRUD operations for MongoDB syntax

### 5. **Updated Configuration**
- Modified `appsettings.json` with MongoDB connection string
- Connection: `mongodb://localhost:27017`
- Database: `EmployeeResourceDB`

---

## 🚀 How to Use MongoDB Compass

### Step 1: Start MongoDB
Before using Compass, ensure MongoDB server is running:

1. **Open Command Prompt as Administrator**
2. **Start MongoDB service:**
   ```powershell
   net start MongoDB
   ```
   
   If MongoDB is not installed as a service, you can start it manually:
   ```powershell
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath="C:\data\db"
   ```

### Step 2: Connect with MongoDB Compass

1. **Open MongoDB Compass**
2. **Connection String:** The app should auto-detect `mongodb://localhost:27017`
3. **Click "Connect"**

### Step 3: View Your Database

After starting your API and creating some data:

1. **In Compass, look for:** `EmployeeResourceDB` database
2. **You'll see three collections:**
   - `Employees`
   - `Projects`
   - `Allocations`

3. **Click on any collection to:**
   - View all documents
   - Search/filter data
   - Edit documents
   - Delete documents
   - View indexes

### Step 4: Useful Compass Features

**View Documents:**
- Click on a collection name
- See all records in JSON format
- MongoDB uses `_id` field (auto-generated ObjectId)

**Search/Filter:**
```json
{ "Department": "IT" }
{ "IsActive": true }
{ "Name": { "$regex": "John", "$options": "i" } }
```

**Add New Document:**
- Click "ADD DATA" → "Insert Document"
- Paste JSON or use the editor
- Example Employee:
```json
{
  "Name": "John Doe",
  "Email": "john@example.com",
  "Phone": "1234567890",
  "Department": "IT",
  "Role": "Employee",
  "Designation": "Developer",
  "JoiningDate": "2024-01-01T00:00:00Z",
  "IsActive": true
}
```

**Export Data:**
- Click collection → "..." menu → "Export Collection"
- Choose JSON or CSV format

**Import Data:**
- Click collection → "ADD DATA" → "Import File"
- Select JSON/CSV file

---

## 🏃‍♂️ Running Your Application

### 1. Start MongoDB (if not running)
```powershell
net start MongoDB
```

### 2. Run Your API
```powershell
cd "b:\OneDrive - Amity University\Desktop\CRUD\hcl1\EmployeeResourceAPI"
dotnet run
```

### 3. Test the API
- **Swagger UI:** Open `https://localhost:<port>` in your browser
- **Test Endpoints:**
  - POST `/api/Employees` - Create employee
  - GET `/api/Employees` - View all employees
  - GET `/api/Employees/{id}` - View specific employee
  - PUT `/api/Employees/{id}` - Update employee
  - DELETE `/api/Employees/{id}` - Delete employee

---

## 📊 MongoDB vs SQLite Differences

| Feature | SQLite (Before) | MongoDB (Now) |
|---------|----------------|---------------|
| **ID Type** | `int` (auto-increment) | `string` (ObjectId) |
| **Database File** | `employeeresource.db` | Cloud/Server database |
| **Relationships** | Foreign keys | Embedded/Referenced |
| **Query Language** | SQL | MongoDB Query (JSON) |
| **Scalability** | Small apps | Production-ready |

---

## 🔧 Common MongoDB Compass Tasks

### Check if MongoDB is Running
In Compass, if you see "Unable to connect", MongoDB service is not running.

### Create Indexes for Performance
1. Open collection in Compass
2. Go to "Indexes" tab
3. Click "CREATE INDEX"
4. Example for Email uniqueness:
```json
{
  "Email": 1
}
```
Options: `{ "unique": true }`

### View Database Stats
- Click on database name
- See collection count, storage size, indexes

### Backup Database
1. Use `mongodump` command:
```powershell
mongodump --db=EmployeeResourceDB --out=C:\backup
```

### Restore Database
```powershell
mongorestore --db=EmployeeResourceDB C:\backup\EmployeeResourceDB
```

---

## 💡 Tips

1. **ObjectId Format:** MongoDB IDs look like: `"6751234567890abcdef12345"`
2. **IDs in Frontend:** Update your Angular services to use string IDs
3. **Connection String:** Can be changed in `appsettings.json`
4. **Local Development:** Default port is 27017
5. **Data Persistence:** Unlike SQLite file, MongoDB stores data in its own directory

---

## ⚠️ Important Notes

- **Old SQLite file** (`employeeresource.db`) is no longer used - you can delete it
- **Frontend Updates:** Update your Angular services to handle string IDs instead of numbers
- **Collections are auto-created:** When you first insert data, MongoDB automatically creates collections
- **No migrations needed:** Unlike EF Core, MongoDB doesn't require migrations

---

## 🌐 MongoDB Connection Strings

**Local Development:**
```
mongodb://localhost:27017
```

**With Authentication:**
```
mongodb://username:password@localhost:27017
```

**MongoDB Atlas (Cloud):**
```
mongodb+srv://username:password@cluster.mongodb.net/EmployeeResourceDB
```

---

## 📖 Next Steps

1. ✅ Start MongoDB service
2. ✅ Open MongoDB Compass and connect
3. ✅ Run your API
4. ✅ Test creating an employee via Swagger
5. ✅ View the new employee in Compass
6. ⚡ Update your Angular frontend (if needed) to handle string IDs

---

## 🆘 Troubleshooting

**Problem:** "Unable to connect to MongoDB"
- **Solution:** Ensure MongoDB service is running (`net start MongoDB`)

**Problem:** "Database not showing in Compass"
- **Solution:** Create at least one document first, then refresh Compass

**Problem:** "Invalid ID format" errors
- **Solution:** Make sure your frontend sends string IDs, not numbers

**Problem:** API won't start
- **Solution:** Run `dotnet build` to check for compilation errors

---

Enjoy using MongoDB! 🎉
