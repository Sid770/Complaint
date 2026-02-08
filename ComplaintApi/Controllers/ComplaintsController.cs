using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComplaintApi.Models;
using ComplaintApi.Data;

namespace ComplaintApi.Controllers;

[ApiController]
[Route("api/complaints")]
public class ComplaintsController : ControllerBase
{
    private readonly ComplaintDbContext _context;

    public ComplaintsController(ComplaintDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllComplaints([FromQuery] string? category, [FromQuery] string? status, [FromQuery] string? search)
    {
        var query = _context.Complaints.Include(c => c.Comments).AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(c => c.Category == category);
        }

        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(c => c.Status == status);
        }

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(c => 
                c.Title.Contains(search) ||
                c.Description.Contains(search));
        }

        var result = await query.OrderByDescending(c => c.CreatedAt).ToListAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetComplaint(string id)
    {
        var complaint = await _context.Complaints
            .Include(c => c.Comments)
            .FirstOrDefaultAsync(c => c.Id == id);
            
        if (complaint == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }
        return Ok(complaint);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComplaint([FromBody] ComplaintEntity complaint)
    {
        complaint.Id = Guid.NewGuid().ToString();
        complaint.Status = "Open";
        complaint.CreatedAt = DateTime.UtcNow;
        complaint.UpdatedAt = DateTime.UtcNow;
        complaint.Comments = new List<CommentEntity>();
        
        _context.Complaints.Add(complaint);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetComplaint), new { id = complaint.Id }, complaint);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] StatusUpdateRequest request)
    {
        var complaint = await _context.Complaints.FindAsync(id);
        if (complaint == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }

        complaint.Status = request.Status;
        complaint.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return Ok(complaint);
    }

    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(string id, [FromBody] CommentRequest request)
    {
        var complaint = await _context.Complaints
            .Include(c => c.Comments)
            .FirstOrDefaultAsync(c => c.Id == id);
            
        if (complaint == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }

        var comment = new CommentEntity
        {
            Id = Guid.NewGuid().ToString(),
            Text = request.Text,
            Author = request.Author,
            CreatedAt = DateTime.UtcNow
        };

        complaint.Comments.Add(comment);
        complaint.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return Ok(comment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComplaint(string id)
    {
        var complaint = await _context.Complaints.FindAsync(id);
        if (complaint == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }

        _context.Complaints.Remove(complaint);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

public class StatusUpdateRequest
{
    public string Status { get; set; } = string.Empty;
}

public class CommentRequest
{
    public string Text { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
}
