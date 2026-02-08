using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using EmployeeResourceAPI.Data;
using EmployeeResourceAPI.Models;
using EmployeeResourceAPI.DTOs;

namespace EmployeeResourceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocationsController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public AllocationsController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        // GET: api/Allocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocationDto>>> GetAllocations()
        {
            var allocations = await _mongoDb.Allocations.Find(_ => true).ToListAsync();
            
            var allocationDtos = allocations.Select(a => new AllocationDto
            {
                Id = a.Id!,
                EmployeeId = a.EmployeeId,
                EmployeeName = a.EmployeeName,
                ProjectId = a.ProjectId,
                ProjectName = a.ProjectName,
                AllocationDate = a.AllocationDate,
                ReleaseDate = a.ReleaseDate,
                AllocationPercentage = a.AllocationPercentage,
                Remarks = a.Remarks
            }).ToList();

            return Ok(allocationDtos);
        }

        // GET: api/Allocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AllocationDto>> GetAllocation(string id)
        {
            var allocation = await _mongoDb.Allocations
                .Find(a => a.Id == id)
                .FirstOrDefaultAsync();

            if (allocation == null)
            {
                return NotFound();
            }

            var allocationDto = new AllocationDto
            {
                Id = allocation.Id!,
                EmployeeId = allocation.EmployeeId,
                EmployeeName = allocation.EmployeeName,
                ProjectId = allocation.ProjectId,
                ProjectName = allocation.ProjectName,
                AllocationDate = allocation.AllocationDate,
                ReleaseDate = allocation.ReleaseDate,
                AllocationPercentage = allocation.AllocationPercentage,
                Remarks = allocation.Remarks
            };

            return Ok(allocationDto);
        }

        // GET: api/Allocations/employee/5
        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<AllocationDto>>> GetEmployeeAllocations(string employeeId)
        {
            var allocations = await _mongoDb.Allocations
                .Find(a => a.EmployeeId == employeeId)
                .ToListAsync();
            
            var allocationDtos = allocations.Select(a => new AllocationDto
            {
                Id = a.Id!,
                EmployeeId = a.EmployeeId,
                EmployeeName = a.EmployeeName,
                ProjectId = a.ProjectId,
                ProjectName = a.ProjectName,
                AllocationDate = a.AllocationDate,
                ReleaseDate = a.ReleaseDate,
                AllocationPercentage = a.AllocationPercentage,
                Remarks = a.Remarks
            }).ToList();

            return Ok(allocationDtos);
        }

        // GET: api/Allocations/project/5
        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<IEnumerable<AllocationDto>>> GetProjectAllocations(string projectId)
        {
            var allocations = await _mongoDb.Allocations
                .Find(a => a.ProjectId == projectId)
                .ToListAsync();
            
            var allocationDtos = allocations.Select(a => new AllocationDto
            {
                Id = a.Id!,
                EmployeeId = a.EmployeeId,
                EmployeeName = a.EmployeeName,
                ProjectId = a.ProjectId,
                ProjectName = a.ProjectName,
                AllocationDate = a.AllocationDate,
                ReleaseDate = a.ReleaseDate,
                AllocationPercentage = a.AllocationPercentage,
                Remarks = a.Remarks
            }).ToList();

            return Ok(allocationDtos);
        }

        // POST: api/Allocations
        [HttpPost]
        public async Task<ActionResult<AllocationDto>> CreateAllocation(CreateAllocationDto createDto)
        {
            // Get employee and project names
            var employee = await _mongoDb.Employees
                .Find(e => e.Id == createDto.EmployeeId)
                .FirstOrDefaultAsync();
                
            var project = await _mongoDb.Projects
                .Find(p => p.Id == createDto.ProjectId)
                .FirstOrDefaultAsync();

            if (employee == null || project == null)
            {
                return BadRequest("Invalid Employee ID or Project ID");
            }

            var allocation = new Allocation
            {
                EmployeeId = createDto.EmployeeId,
                EmployeeName = employee.Name,
                ProjectId = createDto.ProjectId,
                ProjectName = project.Name,
                AllocationDate = createDto.AllocationDate,
                ReleaseDate = createDto.ReleaseDate,
                AllocationPercentage = createDto.AllocationPercentage,
                Remarks = createDto.Remarks
            };

            await _mongoDb.Allocations.InsertOneAsync(allocation);

            var allocationDto = new AllocationDto
            {
                Id = allocation.Id!,
                EmployeeId = allocation.EmployeeId,
                EmployeeName = allocation.EmployeeName,
                ProjectId = allocation.ProjectId,
                ProjectName = allocation.ProjectName,
                AllocationDate = allocation.AllocationDate,
                ReleaseDate = allocation.ReleaseDate,
                AllocationPercentage = allocation.AllocationPercentage,
                Remarks = allocation.Remarks
            };

            return CreatedAtAction(nameof(GetAllocation), new { id = allocation.Id }, allocationDto);
        }

        // PUT: api/Allocations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAllocation(string id, UpdateAllocationDto updateDto)
        {
            var allocation = await _mongoDb.Allocations
                .Find(a => a.Id == id)
                .FirstOrDefaultAsync();

            if (allocation == null)
            {
                return NotFound();
            }

            allocation.ReleaseDate = updateDto.ReleaseDate;
            allocation.AllocationPercentage = updateDto.AllocationPercentage;
            allocation.Remarks = updateDto.Remarks;

            await _mongoDb.Allocations.ReplaceOneAsync(a => a.Id == id, allocation);

            return NoContent();
        }

        // DELETE: api/Allocations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAllocation(string id)
        {
            var result = await _mongoDb.Allocations.DeleteOneAsync(a => a.Id == id);
            
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
