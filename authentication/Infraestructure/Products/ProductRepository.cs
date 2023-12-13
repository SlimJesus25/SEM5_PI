using RobDroneGO.Domain.Products;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Products
{
    public class ProductRepository : BaseRepository<Product, ProductId>,IProductRepository
    {
        public ProductRepository(RobDroneGODbContext context):base(context.Products)
        {
           
        }
    }
}