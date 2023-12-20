using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Users;

namespace RobDroneGO.Infrastructure.Users
{
    internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //builder.ToTable("Users", SchemaNames.RobDroneGO);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.FullName).Property(b => b.Name).HasColumnName("FullName").IsRequired();
            builder.OwnsOne(b => b.Username).Property(b => b.Name).HasColumnName("Username").IsRequired();
            builder.OwnsOne(b => b.Email).Property(b => b.Email).HasColumnName("Email").IsRequired();
            builder.OwnsOne(b => b.PhoneNumber).Property(b => b.PhoneNumber).HasColumnName("PhoneNumber").IsRequired();
            builder.OwnsOne(b => b.Cc).Property(b => b.CC).HasColumnName("CC").IsRequired();
            builder.OwnsOne(b => b.Password).Property(b => b.Password).HasColumnName("Password").IsRequired();
            //builder.OwnsOne(b => b.RoleId).Property(b => b.Role.AsString).HasColumnName("Role").IsRequired();
            //builder.HasOne(b => b.RoleId) .WithMany().HasForeignKey(b => b.RoleId).IsRequired();
            builder.HasOne<Role>().WithMany().HasForeignKey(b => b.RoleId).IsRequired();
        }
    }
}