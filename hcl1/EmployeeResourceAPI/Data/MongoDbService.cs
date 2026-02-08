using MongoDB.Driver;
using EmployeeResourceAPI.Models;

namespace EmployeeResourceAPI.Data
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDB");
            var databaseName = configuration.GetValue<string>("MongoDbSettings:DatabaseName");
            
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Employee> Employees => 
            _database.GetCollection<Employee>("Employees");

        public IMongoCollection<Project> Projects => 
            _database.GetCollection<Project>("Projects");

        public IMongoCollection<Allocation> Allocations => 
            _database.GetCollection<Allocation>("Allocations");
    }
}
