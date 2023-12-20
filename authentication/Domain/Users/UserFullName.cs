using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class UserFullName : IValueObject
    {
        public string Name { get; private set; } 

        public UserFullName(string value)
        {
            Name = value;
        }

        public UserFullName(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return Name;
        }
    }
}