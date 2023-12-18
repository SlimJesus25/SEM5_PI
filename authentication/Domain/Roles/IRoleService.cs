using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobDroneGO.Domain.Roles{
    public interface IRoleService{
        Task<List<RoleDto>> GetAllAsync();
        Task<RoleDto> GetByNumberIdAsync(RoleIdNumber id);
        Task<RoleDto> AddAsync(CreatingRoleDto dto);
        Task<RoleDto> InactivateAsync(RoleIdNumber id);
        Task<RoleDto> UpdateAsync(RoleDto dto);
        Task<RoleDto> DeleteAsync(RoleIdNumber id);
    }
}