using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;


namespace RobDroneGO.Domain.Roles
{
    public interface IRoleRepository:IRepository<Role,RoleId>
    {
        //Task<List<Role>> GetByDesignationAsync(RoleDesignation roleDesignation);
        Task<Role> GetByNumberIdAsync(RoleId id);
        Task<int> CountRoles();
    }
}