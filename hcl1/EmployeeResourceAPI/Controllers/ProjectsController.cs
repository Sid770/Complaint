using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using EmployeeResourceAPI.Data;
using EmployeeResourceAPI.Models;
using EmployeeResourceAPI.DTOs;

namespace EmployeeResourceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public ProjectsController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            var projects = await _mongoDb.Projects.Find(_ => true).ToListAsync();
            
            var projectDtos = projects.Select(p => new ProjectDto
            {
                Id = p.Id!,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Status = p.Status,
                ManagerName = p.ManagerName,
                ClientName = p.ClientName
            }).ToList();

            return Ok(projectDtos);
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(string id)
        {
            var project = await _mongoDb.Projects
                .Find(p => p.Id == id)
                .FirstOrDefaultAsync();

            if (project == null)
            {
                return NotFound();
            }

            var projectDto = new ProjectDto
            {
                Id = project.Id!,
                Name = project.Name,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                ManagerName = project.ManagerName,
                ClientName = project.ClientName
            };

            return Ok(projectDto);
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(CreateProjectDto createDto)
        {
            var project = new Project
            {
                Name = createDto.Name,
                Description = createDto.Description,
                StartDate = createDto.StartDate,
                EndDate = createDto.EndDate,
                Status = createDto.Status,
                ManagerName = createDto.ManagerName,
                ClientName = createDto.ClientName
            };

            await _mongoDb.Projects.InsertOneAsync(project);

            var projectDto = new ProjectDto
            {
                Id = project.Id!,
                Name = project.Name,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                ManagerName = project.ManagerName,
                ClientName = project.ClientName
            };

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectDto);
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(string id, UpdateProjectDto updateDto)
        {
            var project = await _mongoDb.Projects
                .Find(p => p.Id == id)
                .FirstOrDefaultAsync();

            if (project == null)
            {
                return NotFound();
            }

            project.Name = updateDto.Name;
            project.Description = updateDto.Description;
            project.EndDate = updateDto.EndDate;
            project.Status = updateDto.Status;
            project.ManagerName = updateDto.ManagerName;
            project.ClientName = updateDto.ClientName;

            await _mongoDb.Projects.ReplaceOneAsync(p => p.Id == id, project);

            return NoContent();
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(string id)
        {
            var result = await _mongoDb.Projects.DeleteOneAsync(p => p.Id == id);
            
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
