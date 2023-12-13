using RobDroneGO.Domain.Categories;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Categories
{
    public class CategoryRepository : BaseRepository<Category, CategoryId>, ICategoryRepository
    {
    
        public CategoryRepository(RobDroneGODbContext context):base(context.Categories)
        {
           
        }


    }
}