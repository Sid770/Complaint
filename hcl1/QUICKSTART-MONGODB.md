# 🚀 Quick Start: Using MongoDB with Your Project

## ✅ Migration Complete!

Your project has been successfully migrated from SQLite to MongoDB. Here's what you need to do next:

---

## Step 1: Start MongoDB Service

Open **Command Prompt or PowerShell as Administrator** and run:

```powershell
net start MongoDB
```

**If MongoDB is not installed as a Windows service**, start it manually:
```powershell
"C:\Program Files\MongoDB\Server\<your-version>\bin\mongod.exe"
```

---

## Step 2: Open MongoDB Compass

1. Launch **MongoDB Compass** (the app you installed)
2. You should see a connection screen
3. **Connection String:** `mongodb://localhost:27017`
4. Click **"Connect"**

✅ **You're now connected to MongoDB!**

---

## Step 3: Run Your API

Open a terminal and run:

```powershell
cd "b:\OneDrive - Amity University\Desktop\CRUD\hcl1\EmployeeResourceAPI"
dotnet run
```

The API will start on `https://localhost:<port>` (check the console output for the exact port)

---

## Step 4: Test Your API

Open your browser and go to: `https://localhost:<port>`

This will open **Swagger UI** where you can:
- **Create employees** (POST /api/Employees)
- **View employees** (GET /api/Employees)
- **Update/Delete employees**
- Same for Projects and Allocations

---

## Step 5: View Data in MongoDB Compass

1. After creating data through your API (via Swagger)
2. Go back to **MongoDB Compass**
3. Click the **refresh icon** (circular arrow)
4. You should see a new database: **`EmployeeResourceDB`**
5. Click on it to expand
6. You'll see three collections:
   - **Employees**
   - **Projects**
   - **Allocations**
7. Click any collection to see your data in JSON format

---

## 🎯 What Changed in Your Code

### Before (SQLite):
```csharp
public int Id { get; set; }  // Integer IDs
```

### Now (MongoDB):
```csharp
public string? Id { get; set; }  // String IDs (ObjectId)
```

**Example MongoDB ID:** `"6751234567890abcdef12345"`

---

## 🔥 MongoDB Compass Basics

### View All Documents
- Click on a collection name (e.g., "Employees")
- See all records as JSON

### Add New Document
- Click "ADD DATA" → "Insert Document"
- Paste this example employee:
```json
{
  "Name": "Jane Smith",
  "Email": "jane@example.com",
  "Phone": "9876543210",
  "Department": "HR",
  "Role": "Manager",
  "Designation": "HR Manager",
  "JoiningDate": "2024-01-15T00:00:00Z",
  "IsActive": true
}
```
- Click "Insert"

### Search/Filter Documents
In the filter bar, try:
```json
{ "Department": "IT" }
```
or
```json
{ "IsActive": true }
```

### Edit a Document
- Click on any document
- Click the pencil icon (Edit)
- Make changes
- Click "Update"

### Delete a Document
- Hover over a document
- Click the trash icon
- Confirm deletion

---

## 📝 Important Notes

1. **No more SQLite file**: The old `employeeresource.db` file has been deleted
2. **IDs are strings now**: MongoDB uses string IDs (ObjectIds), not integers
3. **Collections auto-create**: MongoDB creates collections automatically when you insert data
4. **No migrations**: Unlike Entity Framework, no migrations are needed

---

## ⚠️ Update Your Angular Frontend (If Applicable)

Since IDs changed from `number` to `string`, update your TypeScript models:

### Before:
```typescript
export interface Employee {
  id: number;  // ❌ Old
  name: string;
  // ...
}
```

### After:
```typescript
export interface Employee {
  id: string;  // ✅ New - MongoDB ObjectId
  name: string;
  // ...
}
```

Same for `Project` and `Allocation` models.

---

## 🆘 Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution:** Make sure MongoDB service is running:
```powershell
net start MongoDB
```

### Problem: "Database not showing in Compass"
**Solution:** 
1. Create at least one employee via Swagger
2. Click refresh in Compass
3. Database appears only after first data insert

### Problem: "Build errors"
**Solution:** Run:
```powershell
dotnet clean
dotnet build
```

### Problem: "API returns 500 error"
**Solution:** Check if MongoDB is running and connection string is correct in `appsettings.json`

---

## 📚 Learning Resources

- **MongoDB Basics:** https://learn.mongodb.com/
- **MongoDB Compass Docs:** https://docs.mongodb.com/compass/
- **MongoDB Query Language:** https://docs.mongodb.com/manual/tutorial/query-documents/

---

## ✨ What You Can Do in Compass

✅ View all your data in a beautiful UI  
✅ Search and filter documents  
✅ Add/Edit/Delete records manually  
✅ Export data to JSON/CSV  
✅ Import data from files  
✅ Create indexes for better performance  
✅ View database statistics  
✅ Analyze query performance  

---

**Ready to go! Start MongoDB, open Compass, run your API, and start managing your employee resources! 🎉**
