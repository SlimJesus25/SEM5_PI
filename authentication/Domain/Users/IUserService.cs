using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobDroneGO.Domain.Users{
    public interface IUserService{
        Task<List<UserDto>> GetAllAsync();
        //Task<List<UserDto>> GetByDesignationAsync(UserDesignation roleDesignation);
        Task<UserDto> GetByIdAsync(UserId id);
        //Task<UserDto> GetByNumberIdAsync(UserIdNumber id);
        //Task<UserDto> AddAsync(CreatingUserDto dto);
        Task<UserDto> InactivateAsync(UserId id);
        Task<UserDto> UpdateAsync(UserDto dto);
        Task<UserDto> DeleteAsync(UserId id);
    }
}