using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;

//
namespace RobDroneGO.Domain.Users
{   
    public interface IUserRepository:IRepository<User,UserId>
    {
        Task<User> GetByNumberIdAsync(UserId id);
        Task<int> CountUsers();
    }
}