using System.Collections.Generic;
using System.Threading.Tasks;
//
namespace RobDroneGO.Domain.Users{
    public interface IUserService{
        Task<List<UserDto>> GetAllAsync();
        Task<UserDto> GetByIdAsync(UserId id);
        Task<UserDto> AddUserAsync(CreatingUserDto dto);
        Task<UserDto> AddUtenteAsync(CreatingUserDto dto);
        //Task<UserDto> InactivateAsync(UserId id);
        Task<UserDto> UpdateAsync(UserDto dto);
        Task<UserDto> DeleteAsync(UserId id);

        Task<UserDto> Login(UserEmail email,UserPassword password);
    }
}