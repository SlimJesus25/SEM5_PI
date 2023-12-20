using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class UserCC : IValueObject
    {
        public string CC { get; private set; }

        public UserCC(string value)
        {
            CC = value;
        }

        public UserCC() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return CC;
        }*/

        public string toString()
        {
            return CC;
        }
    }
}