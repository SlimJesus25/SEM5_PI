using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoPhoneNumber : IValueObject
    {
        public string PhoneNumber { get; private set; } 

        public PedidoPhoneNumber(string value)
        {
            PhoneNumber = value;
        }

        public PedidoPhoneNumber(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return PhoneNumber;
        }
    }
}