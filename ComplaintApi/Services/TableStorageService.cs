using Azure.Data.Tables;
using ComplaintApi.Models;
using System.Text.Json;

namespace ComplaintApi.Services;

public class TableStorageService
{
    private readonly TableClient _tableClient;

    public TableStorageService(IConfiguration configuration)
    {
        var connectionString = configuration["AzureTableStorage:ConnectionString"] 
            ?? "UseDevelopmentStorage=true";
        var tableName = configuration["AzureTableStorage:TableName"] ?? "Complaints";
        
        _tableClient = new TableClient(connectionString, tableName);
        _tableClient.CreateIfNotExists();
    }

    public async Task<ComplaintEntity> CreateComplaintAsync(ComplaintEntity complaint)
    {
        complaint.Id = Guid.NewGuid().ToString();
        complaint.RowKey = complaint.Id;
        complaint.CreatedAt = DateTime.UtcNow;
        complaint.UpdatedAt = DateTime.UtcNow;
        complaint.Comments = "[]";

        await _tableClient.AddEntityAsync(complaint);
        return complaint;
    }

    public async Task<List<ComplaintEntity>> GetAllComplaintsAsync(string? category = null, string? status = null, string? search = null)
    {
        var complaints = new List<ComplaintEntity>();
        
        await foreach (var complaint in _tableClient.QueryAsync<ComplaintEntity>())
        {
            var matches = true;

            if (!string.IsNullOrEmpty(category) && !complaint.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                matches = false;

            if (!string.IsNullOrEmpty(status) && !complaint.Status.Equals(status, StringComparison.OrdinalIgnoreCase))
                matches = false;

            if (!string.IsNullOrEmpty(search))
            {
                if (!complaint.Title.Contains(search, StringComparison.OrdinalIgnoreCase) &&
                    !complaint.Description.Contains(search, StringComparison.OrdinalIgnoreCase))
                    matches = false;
            }

            if (matches)
                complaints.Add(complaint);
        }

        return complaints.OrderByDescending(c => c.CreatedAt).ToList();
    }

    public async Task<ComplaintEntity?> GetComplaintByIdAsync(string id)
    {
        try
        {
            var response = await _tableClient.GetEntityAsync<ComplaintEntity>("Complaint", id);
            return response.Value;
        }
        catch
        {
            return null;
        }
    }

    public async Task<ComplaintEntity?> UpdateComplaintStatusAsync(string id, string status)
    {
        var complaint = await GetComplaintByIdAsync(id);
        if (complaint == null) return null;

        complaint.Status = status;
        complaint.UpdatedAt = DateTime.UtcNow;

        await _tableClient.UpdateEntityAsync(complaint, complaint.ETag, TableUpdateMode.Replace);
        return complaint;
    }

    public async Task<CommentEntity?> AddCommentAsync(string complaintId, CommentEntity comment)
    {
        var complaint = await GetComplaintByIdAsync(complaintId);
        if (complaint == null) return null;

        comment.Id = Guid.NewGuid().ToString();
        comment.CreatedAt = DateTime.UtcNow;

        var comments = JsonSerializer.Deserialize<List<CommentEntity>>(complaint.Comments) ?? new List<CommentEntity>();
        comments.Add(comment);
        complaint.Comments = JsonSerializer.Serialize(comments);
        complaint.UpdatedAt = DateTime.UtcNow;

        await _tableClient.UpdateEntityAsync(complaint, complaint.ETag, TableUpdateMode.Replace);
        return comment;
    }

    public async Task<bool> DeleteComplaintAsync(string id)
    {
        try
        {
            await _tableClient.DeleteEntityAsync("Complaint", id);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
