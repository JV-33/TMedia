﻿using System;
using Microsoft.EntityFrameworkCore;
using TMedia.Core;
using TMedia.Data;
using TMedia.Services;

namespace TMedia;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddScoped<IDeviceService, DeviceService>();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("YourCorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:3000") 
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

        app.UseCors("YourCorsPolicy");

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}

