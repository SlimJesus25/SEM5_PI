using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class UserPhoneNumber : IValueObject
    {
        public string PhoneNumber { get; private set; } 

        public UserPhoneNumber(string value)
        {
            PhoneNumber = value;
        }

        public UserPhoneNumber(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return PhoneNumber;
        }
    }
}