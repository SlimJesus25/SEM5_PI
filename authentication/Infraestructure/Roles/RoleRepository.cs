using RobDroneGO.Domain.Roles;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>,IRoleRepository
    {
        public RoleRepository(RobDroneGODbContext context):base(context.Roles)
        {
           
        }
    }
}