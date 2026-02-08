namespace EmployeeResourceAPI.DTOs
{
    public class AllocationDto
    {
        public string Id { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public string ProjectId { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public DateTime AllocationDate { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public int AllocationPercentage { get; set; }
        public string Remarks { get; set; } = string.Empty;
    }

    public class CreateAllocationDto
    {
        public string EmployeeId { get; set; } = string.Empty;
        public string ProjectId { get; set; } = string.Empty;
        public DateTime AllocationDate { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public int AllocationPercentage { get; set; }
        public string Remarks { get; set; } = string.Empty;
    }

    public class UpdateAllocationDto
    {
        public DateTime? ReleaseDate { get; set; }
        public int AllocationPercentage { get; set; }
        public string Remarks { get; set; } = string.Empty;
    }
}
