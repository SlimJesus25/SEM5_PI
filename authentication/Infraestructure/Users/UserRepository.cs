using RobDroneGO.Domain.Users;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>,IUserRepository
    {
        public UserRepository(RobDroneGODbContext context):base(context.Users)
        {
           
        }
    }
}