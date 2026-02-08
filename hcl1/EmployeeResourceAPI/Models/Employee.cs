using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EmployeeResourceAPI.Models
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // Admin, Manager, Employee
        public string Designation { get; set; } = string.Empty;
        public DateTime JoiningDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
