using Microsoft.AspNetCore.Mvc;
using ComplaintApi.Models;
using ComplaintApi.Services;
using System.Text.Json;

namespace ComplaintApi.Controllers;

[ApiController]
[Route("api/complaints")]
public class ComplaintsController : ControllerBase
{
    private readonly TableStorageService _tableService;

    public ComplaintsController(TableStorageService tableService)
    {
        _tableService = tableService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllComplaints([FromQuery] string? category, [FromQuery] string? status, [FromQuery] string? search)
    {
        var complaints = await _tableService.GetAllComplaintsAsync(category, status, search);
        
        // Convert complaints to response format with parsed comments
        var response = complaints.Select(c => new
        {
            c.Id,
            c.Title,
            c.Description,
            c.Category,
            c.Priority,
            c.Status,
            c.CreatedAt,
            c.UpdatedAt,
            c.CreatedBy,
            Comments = JsonSerializer.Deserialize<List<CommentEntity>>(c.Comments) ?? new List<CommentEntity>()
        });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetComplaint(string id)
    {
        var complaint = await _tableService.GetComplaintByIdAsync(id);
            
        if (complaint == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }

        var response = new
        {
            complaint.Id,
            complaint.Title,
            complaint.Description,
            complaint.Category,
            complaint.Priority,
            complaint.Status,
            complaint.CreatedAt,
            complaint.UpdatedAt,
            complaint.CreatedBy,
            Comments = JsonSerializer.Deserialize<List<CommentEntity>>(complaint.Comments) ?? new List<CommentEntity>()
        };

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComplaint([FromBody] ComplaintEntity complaint)
    {
        var created = await _tableService.CreateComplaintAsync(complaint);
        return CreatedAtAction(nameof(GetComplaint), new { id = created.Id }, created);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] StatusUpdateRequest request)
    {
        var complaint = await _tableService.UpdateComplaintStatusAsync(id, request.Status);
        if (complaint == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }

        return Ok(complaint);
    }

    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(string id, [FromBody] CommentRequest request)
    {
        var comment = new CommentEntity
        {
            Text = request.Text,
            Author = request.Author
        };

        var addedComment = await _tableService.AddCommentAsync(id, comment);
        if (addedComment == null)
        {
            return NotFound(new { message = "Complaint not found" });
        }

        return Ok(addedComment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComplaint(string id)
    {
        var deleted = await _tableService.DeleteComplaintAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = "Complaint not found" });
        }

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
