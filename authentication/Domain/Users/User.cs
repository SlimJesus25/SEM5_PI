using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using System;
namespace RobDroneGO.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
        public UserName Name {get; set;}

        public UserEmail Email {get; set;}

        public UserPhoneNumber PhoneNumber {get; set;}

        public UserPassword Password { get ; set; }

        public RoleId RoleId { get; set; }

        public bool Active { get; set; }



        public User()
        {
            this.Active = true;
        }

        public User(string name, string email,string phoneNumber, string password, RoleId roleId)
        {
            if (roleId == null)
                throw new BusinessRuleValidationException("Every user needs a role");
            this.Id = new UserId(Guid.NewGuid());
            this.Name = new UserName(name);
            this.Email = new UserEmail(email);
            this.PhoneNumber = new UserPhoneNumber(phoneNumber);
            this.RoleId = roleId;
            this.Password = new UserPassword(password);

            this.Active = true;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}