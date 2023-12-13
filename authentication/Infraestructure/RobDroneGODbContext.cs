using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Categories;
using RobDroneGO.Domain.Products;
using RobDroneGO.Domain.Families;
using RobDroneGO.Infrastructure.Categories;
using RobDroneGO.Infrastructure.Products;

namespace RobDroneGO.Infrastructure
{
    public class RobDroneGODbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public RobDroneGODbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
        }
    }
}