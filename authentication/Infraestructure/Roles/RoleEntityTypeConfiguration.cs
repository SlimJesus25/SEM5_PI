using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RobDroneGO.Domain.Roles;

namespace RobDroneGO.Infrastructure.Roles
{
    internal class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            //builder.ToTable("Roles", SchemaNames.RobDroneGO);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.IdNumber).Property(b => b.IdNumber).HasColumnName("IdNumber").IsRequired();
            builder.OwnsOne(b => b.Name).Property(b => b.Name).HasColumnName("Name").IsRequired();
            builder.OwnsOne(b => b.Description).Property(b => b.Description).HasColumnName("Description").IsRequired();
        }
    }
}