using GES_DAL.DbContexts;
using GES_DAL.Depots;
using GES_Services.Interfaces;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
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
//Manipulation du depot Utilisateur
builder.Services.AddScoped<ManipulationDepotUtilisateur>();
//Manipulation du depot EquipeJoueur
builder.Services.AddScoped<ManipulationDepotEquipeJoueur>();
//Manipulation du depot EvenementEquipe pour chercher equipes
builder.Services.AddScoped<ManipulationDepotEvenementEquipe>();
//Manipulation du depot EvenementJoueur pour chercher joueurs
builder.Services.AddScoped<ManipulationDepotEvenementJoueur>();

//Dependance entre l'interface Evenement et le DepotEvenementSQLServer
builder.Services.AddScoped<IDepotEvenement, DepotEvenementsSQLServer>();
//Dependance entre l'interface Equipe et le DepotEquipeSQLServer
builder.Services.AddScoped<IDepotEquipe, DepotEquipeSQLServer>();
//Dependance entre l'interface evenementCSV et le DepotImportationEvenementCSVSQLServer
builder.Services.AddScoped<IDepotImportationEvenementCSV, DepotImportationEvenementCSVSQLServer>();
//Dependance entre l'interface EquipeEvenement et le DepotEquipeEvenementSQLServer
builder.Services.AddScoped<IDepotEquipeEvenement, DepotEquipeEvenementSQLServer>();
//Dependance entre l'interface Utilisateur et le DepotUtilisateurSQLServer
builder.Services.AddScoped<IDepotUtilisateur, DepotUtilisateurSQLServer>();
//Dependance entre l'interface EquipeJoueur et le DepotEquipeJoueurSQLServer
builder.Services.AddScoped<IDepotEquipeJoueur, DepotEquipeJoueurSQLServer>();
//Dependence entre l'interface EvenementEquipe et le DepotEvenementEquipeSQLServer
builder.Services.AddScoped<IDepotEvenementEquipe, DepotEvenementEquipeSQLServer>();
//Dependence entre l'interface EvenementJoueur et le DepotEvenementJoueurSQLServer
builder.Services.AddScoped<IDepotEvenementJoueur, DepotEvenementJoueurSQLServer>();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<Equipe_sportiveContext>();

builder.Services.AddHealthChecks().AddSqlServer(connectionString, tags: new[] { "db" });


//Enregistrez l'authentification comme l'un des services de notre application API
    builder.Services.AddMvc();

    // 1. Add Authentication Services
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
        options.Authority = "https://dev-o048xw576ua8whcd.us.auth0.com/";
        options.Audience = "https://localhost:7225/api";
    });


//var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//                      policy =>
//                      {
//                          policy.WithOrigins("https://localhost:7225",
//                                              "https://localhost:44474"); // add the allowed origins  
//                      });
//});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseDeveloperExceptionPage();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

try
{
    using (var scope = app.Services.CreateScope())
    {
        using (var context = scope.ServiceProvider.GetService<Equipe_sportiveContext>())
        {
            context?.Database.Migrate();
        }
    }
}
catch (Exception ex)
{
    Console.Error.WriteLine(ex.Message);
    throw;
}


//Ajouter un middleware d'authentification et d'autorisation au pipeline de demandes
// 2. Enable authentication middleware

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
    endpoints.MapRazorPages();
});

////////////////app.UseCors(MyAllowSpecificOrigins);

/*app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();*/

app.MapFallbackToFile("index.html");;

app.MapHealthChecks("/healthz/live", new HealthCheckOptions
{
    Predicate = healthCheck => !healthCheck.Tags.Contains("db")
});

app.MapHealthChecks("/healthz/db");

app.Run();
