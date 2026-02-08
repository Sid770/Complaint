using EmployeeResourceAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Employee Resource Management API",
        Version = "v1",
        Description = "API for managing employees, projects, and resource allocations"
    });
});

// Configure MongoDB
builder.Services.AddSingleton<MongoDbService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", builder =>
    {
        builder.WithOrigins(
                "http://localhost:4200",
                "https://*.vercel.app"
            )
               .SetIsOriginAllowedToAllowWildcardSubdomains()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee Resource Management API v1");
    c.RoutePrefix = string.Empty; // Swagger UI at root URL
});

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
