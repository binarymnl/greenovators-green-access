using Microsoft.EntityFrameworkCore;
using Quartz;
using greenovators_service.Controllers;
using greenovators_service.Infrastructure;
using greenovators_service.Job;
using greenovators_service.Service;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// DbContext
var conn = config.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(conn));

// HttpClients
builder.Services.AddHttpClient("ai", c => {
    var baseUrl = config["AiService:BaseUrl"] ?? "http://localhost:8000";
    c.BaseAddress = new Uri(baseUrl);
});

// Services
builder.Services.AddScoped<AiService>();
builder.Services.AddScoped<TelemetryIngestJob>(); // job injected via DI

// Quartz
builder.Services.AddQuartz(q =>
{
    var jobKey = new JobKey("TelemetryIngestJob");
    q.AddJob<TelemetryIngestJob>(opts => opts.WithIdentity(jobKey));
    q.AddTrigger(opts => opts.ForJob(jobKey).WithIdentity("TelemetryIngestJob-trigger")
        .WithSimpleSchedule(x => x.WithIntervalInMinutes(int.Parse(config["Telemetry:IngestIntervalMinutes"] ?? "15")).RepeatForever()));
});
builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

// SignalR
builder.Services.AddSignalR();

// // JWT Auth
// var jwt = config.GetSection("Jwt");
// var key = Encoding.UTF8.GetBytes(jwt["Key"]);
// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// })
// .AddJwtBearer(options =>
// {
//     options.RequireHttpsMetadata = false;
//     options.SaveToken = true;
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ValidateLifetime = true,
//         ValidateIssuerSigningKey = true,
//         ValidIssuer = jwt["Issuer"],
//         ValidAudience = jwt["Audience"],
//         IssuerSigningKey = new SymmetricSecurityKey(key)
//     };
//
//     // allow SignalR to receive access token via query string for web sockets
//     options.Events = new JwtBearerEvents
//     {
//         OnMessageReceived = context =>
//         {
//             var accessToken = context.Request.Query["access_token"];
//             var path = context.HttpContext.Request.Path;
//             if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/dashboardHub")))
//             {
//                 context.Token = accessToken;
//             }
//             return Task.CompletedTask;
//         }
//     };
// });

// controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<OccupancyService>();
builder.Services.AddScoped<AiService>();
builder.Services.AddScoped<IoTService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ReportService>();
builder.Services.AddScoped<ForecastService>();
builder.Services.AddScoped<SlotSuggestionService>();

var app = builder.Build();

// Auto-migrate (dev)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<DashboardHub>("/dashboardHub");

app.Run();
