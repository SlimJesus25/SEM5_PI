using System;
using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Users
{
    public class UserEmail : IValueObject
    {
        public string Email { get; private set; }

        public UserEmail(string value)
        {
            Email = value;
        }

        public UserEmail() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString()
        {
            return Email;
        }
    }
}