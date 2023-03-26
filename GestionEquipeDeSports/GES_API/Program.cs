using GES_DAL.Data;
using GES_DAL.Depots;
using GES_Services.Interfaces;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Connection String
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<Equipe_sportiveContext>(options =>
    options.UseSqlServer(connectionString).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllersWithViews();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

//Manipulation du depot Evenement
builder.Services.AddScoped<ManiulationDepotEvenement>();

//Manipulation du depot Equipe
builder.Services.AddScoped<ManipulationDepotEquipe>();

//Manipulation du depot Evenement CSV
builder.Services.AddScoped<ManipulationDepotImporationEvenementCSV>();

//Manipulation du depot EquipeEvenement
builder.Services.AddScoped<ManipulationDepotEquipeEvenement>();

//Dependance entre l'interface Evenement et le DepotEvenementSQLServer
builder.Services.AddScoped<IDepotEvenement, DepotEvenementsSQLServer>();

//Dependance entre l'interface Equipe et le DepotEquipeSQLServer
builder.Services.AddScoped<IDepotEquipe, DepotEquipeSQLServer>();

//Dependance entre l'interface evenementCSV et le DepotImportationEvenementCSVSQLServer
builder.Services.AddScoped<IDepotImportationEvenementCSV, DepotImportationEvenementCSVSQLServer>();

//Dependance entre l'interface EquipeEvenement et le DepotEquipeEvenementSQLServer
builder.Services.AddScoped<IDepotEquipeEvenement, DepotEquipeEvenementSQLServer>();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<Equipe_sportiveContext>();


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";



builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:7225",
                                              "https://localhost:44474"); // add the allowed origins  
                      });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
    endpoints.MapRazorPages();
});

//app.UseOpenApi();
//app.UseSwaggerUi3();// /swagger

app.MapRazorPages();

app.MapFallbackToFile("index.html");;

app.Run();
