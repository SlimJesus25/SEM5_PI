using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Users;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>,IUserRepository
    {
        private readonly RobDroneGODbContext context;
        public UserRepository(RobDroneGODbContext context):base(context.Users)
        {
           this.context = context;
        }

        public async Task<User> GetByNumberIdAsync(UserId id){
            return await this.context.Users.Where(x => id.Id == x.Id.Id).FirstAsync();
        }

        public async Task<int> CountUsers(){
            return await this.context.Users.CountAsync();
        }
    }
}