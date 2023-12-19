using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Users;
using RobDroneGO.Infrastructure.Roles;
using RobDroneGO.Infrastructure.Users;

namespace RobDroneGO.Infrastructure
{
    public class RobDroneGODbContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }

        public DbSet<User> Users { get; set; }

        public RobDroneGODbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        }
    }
}