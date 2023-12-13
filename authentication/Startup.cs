﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RobDroneGO.Infrastructure;
using RobDroneGO.Infrastructure.Categories;
using RobDroneGO.Infrastructure.Products;
using RobDroneGO.Infrastructure.Families;
using RobDroneGO.Infrastructure.Shared;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Categories;
using RobDroneGO.Domain.Products;
using RobDroneGO.Domain.Families;

namespace RobDroneGO
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            /*services.AddDbContext<RobDroneGODbContext>(opt =>
                opt.UseInMemoryDatabase("RobDroneGODB")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
*/
            services.AddDbContext<RobDroneGODbContext>(opt =>
                opt.UseMySQL(Configuration.GetConnectionString("Default"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());



            ConfigureMyServices(services);


            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<CategoryService>();

            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository, FamilyRepository>();
            services.AddTransient<FamilyService>();
        }
    }
}