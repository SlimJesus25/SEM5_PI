using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoNIF : IValueObject
    {
        public string NIF { get; private set; }

        public PedidoNIF(string value)
        {
            NIF = value;
        }

        public PedidoNIF() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return CC;
        }*/

        public string toString()
        {
            return NIF;
        }
    }
}