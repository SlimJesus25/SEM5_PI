using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Roles
{
    public class RoleDescription : IValueObject
    {
        public string Description { get; private set; }

        public RoleDescription(string value)
        {
            Description = value;
        }

        public RoleDescription() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Description;
        }*/

        public string toString()
        {
            return Description;
        }
    }
}