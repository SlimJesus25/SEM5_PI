using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Roles
{
    public class RoleIdNumber : IValueObject
    {
        
        public int IdNumber { get; private set; } 

        public RoleIdNumber(int value)
        {
            IdNumber = value;
        }

        public RoleIdNumber(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return IdNumber;
        }*/

        public int toInt(){
            return IdNumber;
        }
    }
}