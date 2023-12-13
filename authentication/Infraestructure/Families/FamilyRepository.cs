using RobDroneGO.Domain.Families;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Families
{
    public class FamilyRepository : BaseRepository<Family, FamilyId>, IFamilyRepository
    {
      
        public FamilyRepository(RobDroneGODbContext context):base(context.Families)
        {
            
        }

    }
}