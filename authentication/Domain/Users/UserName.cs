using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class Username : IValueObject
    {
        public string Name { get; private set; } 

        public Username(string value)
        {
            Name = value;
        }

        public Username(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return Name;
        }
    }
}