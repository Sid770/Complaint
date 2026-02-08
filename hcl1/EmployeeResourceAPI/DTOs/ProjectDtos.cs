namespace EmployeeResourceAPI.DTOs
{
    public class ProjectDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ManagerName { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
    }

    public class CreateProjectDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; } = "Active";
        public string ManagerName { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
    }

    public class UpdateProjectDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? EndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ManagerName { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
    }
}
