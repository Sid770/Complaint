using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using EmployeeResourceAPI.Data;
using EmployeeResourceAPI.Models;
using EmployeeResourceAPI.DTOs;

namespace EmployeeResourceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public EmployeesController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employees = await _mongoDb.Employees.Find(_ => true).ToListAsync();
            
            var employeeDtos = employees.Select(e => new EmployeeDto
            {
                Id = e.Id!,
                Name = e.Name,
                Email = e.Email,
                Phone = e.Phone,
                Department = e.Department,
                Role = e.Role,
                Designation = e.Designation,
                JoiningDate = e.JoiningDate,
                IsActive = e.IsActive
            }).ToList();

            return Ok(employeeDtos);
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(string id)
        {
            var employee = await _mongoDb.Employees
                .Find(e => e.Id == id)
                .FirstOrDefaultAsync();

            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = new EmployeeDto
            {
                Id = employee.Id!,
                Name = employee.Name,
                Email = employee.Email,
                Phone = employee.Phone,
                Department = employee.Department,
                Role = employee.Role,
                Designation = employee.Designation,
                JoiningDate = employee.JoiningDate,
                IsActive = employee.IsActive
            };

            return Ok(employeeDto);
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> CreateEmployee(CreateEmployeeDto createDto)
        {
            var employee = new Employee
            {
                Name = createDto.Name,
                Email = createDto.Email,
                Phone = createDto.Phone,
                Department = createDto.Department,
                Role = createDto.Role,
                Designation = createDto.Designation,
                JoiningDate = createDto.JoiningDate,
                IsActive = createDto.IsActive
            };

            await _mongoDb.Employees.InsertOneAsync(employee);

            var employeeDto = new EmployeeDto
            {
                Id = employee.Id!,
                Name = employee.Name,
                Email = employee.Email,
                Phone = employee.Phone,
                Department = employee.Department,
                Role = employee.Role,
                Designation = employee.Designation,
                JoiningDate = employee.JoiningDate,
                IsActive = employee.IsActive
            };

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employeeDto);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(string id, UpdateEmployeeDto updateDto)
        {
            var employee = await _mongoDb.Employees
                .Find(e => e.Id == id)
                .FirstOrDefaultAsync();

            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = updateDto.Name;
            employee.Phone = updateDto.Phone;
            employee.Department = updateDto.Department;
            employee.Role = updateDto.Role;
            employee.Designation = updateDto.Designation;
            employee.IsActive = updateDto.IsActive;

            await _mongoDb.Employees.ReplaceOneAsync(e => e.Id == id, employee);

            return NoContent();
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var result = await _mongoDb.Employees.DeleteOneAsync(e => e.Id == id);
            
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
