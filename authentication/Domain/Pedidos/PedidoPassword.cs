using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoPassword : IValueObject
    {
        public string Password { get; private set; } 

        public PedidoPassword(string value)
        {
            Password = value;
        }

        public PedidoPassword(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Password;
        }*/

        public string toString(){
            return Password;
        }
    }
}