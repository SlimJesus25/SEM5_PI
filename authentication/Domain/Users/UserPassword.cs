using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class UserPassword : IValueObject
    {
        public string Password { get; private set; } 

        public UserPassword(string value)
        {
            Password = value;
        }

        public UserPassword(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Password;
        }*/

        public string toString(){
            return Password;
        }
    }
}