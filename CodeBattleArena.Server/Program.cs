using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Repositories;
using CodeBattleArena.Server.Services;
using CodeBattleArena.Server.Services.DBServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Travel_Agency.Service;
using System.Text.Json.Serialization;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Hubs;
using CodeBattleArena.Server.Services.Notifications;
using CodeBattleArena.Server.Services.Notifications.INotifications;
using CodeBattleArena.Server.Services.Judge0;
using CodeBattleArena.Server.QuestSystem;
using CodeBattleArena.Server.QuestSystem.Dispatcher;
using CodeBattleArena.Server.Untils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); //ENUM Сериализация
        options.JsonSerializerOptions.Converters.Add(new UtcDateTimeConverter());
    });

builder.Services.AddSignalR()
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddHttpClient();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:55689")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["GoogleOAuth:ClientId"];
    options.ClientSecret = builder.Configuration["GoogleOAuth:ClientSecret"];
    options.SaveTokens = true;
})
.AddCookie();

builder.Services.AddScoped<GoogleAuthService>();

builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CodeBattleArena API",
        Version = "v1",
        Description = "API for CodeBattleArena",
    });

    // Избегаем конфликтов имен
    c.CustomSchemaIds(type => type.FullName);
});

//------ DATABASE ------
var connectionStringBD = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDBContext>(options => {
    options.LogTo(Console.WriteLine);
    options.UseSqlServer(connectionStringBD);
});

builder.Services.Configure<IdentityOptions>(options =>
{
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
});

builder.Services.AddIdentity<Player, IdentityRole>()
    .AddEntityFrameworkStores<AppDBContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<PlayerService>();
builder.Services.AddScoped<ChatService>();
builder.Services.AddScoped<SessionService>();
builder.Services.AddScoped<FriendService>();
builder.Services.AddScoped<PlayerSessionService>();
builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<LangProgrammingService>();
builder.Services.AddScoped<LeagueService>();
builder.Services.AddScoped<ItemService>();
builder.Services.AddScoped<QuestService>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddHostedService<SessionObserverService>();
builder.Services.AddHostedService<QuestObserverService>();

//------ QUEST ------
builder.Services.AddScoped<QuestHandlerContext>();
builder.Services.AddScoped<GameEventDispatcher>();

//------ SIGNALR ------
builder.Services.AddScoped<ISessionNotificationService, SessionNotificationService>();
builder.Services.AddScoped<ITaskNotificationService, TaskNotificationService>();
builder.Services.AddScoped<IPlayerNotificationService, PlayerNotificationService>();

builder.Services.AddHttpClient<Judge0Client>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    string[] roles = Enum.GetNames(typeof(Role));

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<SessionHub>("/hubs/session");
app.MapHub<TaskHub>("/hubs/task");
app.MapHub<PlayerHub>("/hubs/player");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
