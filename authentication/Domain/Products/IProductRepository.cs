using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Products
{
    public interface IProductRepository: IRepository<Product,ProductId>
    {
    }
}