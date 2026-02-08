using Microsoft.EntityFrameworkCore;
using ComplaintApi.Models;

namespace ComplaintApi.Data;

public class ComplaintDbContext : DbContext
{
    public ComplaintDbContext(DbContextOptions<ComplaintDbContext> options) : base(options)
    {
    }

    public DbSet<ComplaintEntity> Complaints { get; set; }
    public DbSet<CommentEntity> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ComplaintEntity>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Category).IsRequired();
            entity.Property(e => e.Priority).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.Property(e => e.CreatedBy).IsRequired();
            
            // Configure one-to-many relationship
            entity.HasMany(e => e.Comments)
                .WithOne()
                .HasForeignKey("ComplaintId")
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<CommentEntity>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Text).IsRequired();
            entity.Property(e => e.Author).IsRequired();
        });
    }
}
