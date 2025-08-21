using GaleiraOnline.WebApi.DbContextImagem;
using GaleiraOnline.WebApi.Interfaces;
using GaleiraOnline.WebApi.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IImagemRepository, ImagemRepository>();
builder.Services.AddDbContext<GaleriaOnlineDbContext>
    (options => options.UseSqlServer
    (builder.Configuration.GetConnectionString
    ("DefaultConnection")));

builder.Services.AddCors(Options =>
{
    Options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//A SEQUENCIA IMPORTA MUITO! CUIDADO!!!



app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
