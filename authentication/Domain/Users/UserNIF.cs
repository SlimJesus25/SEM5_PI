using System.Text.RegularExpressions;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class UserNIF : IValueObject
    {
        public string NIF { get; private set; }

        public UserNIF(string value)
        {
            if (!Regex.IsMatch(value, @"^(\d{9})?$"))
            {
                throw new BusinessRuleValidationException("Nif tem de ter 9 digitos");
            }
            NIF = value;
        }

        public UserNIF() { }

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