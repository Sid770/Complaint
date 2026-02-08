using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EmployeeResourceAPI.Models
{
    public class Allocation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        public string EmployeeId { get; set; } = string.Empty;
        public string ProjectId { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public DateTime AllocationDate { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public int AllocationPercentage { get; set; } // 0-100
        public string Remarks { get; set; } = string.Empty;
    }
}
