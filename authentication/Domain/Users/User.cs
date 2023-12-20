using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using System;
namespace RobDroneGO.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {

        public UserFullName FullName { get; private set; }

        public Username Username {get; private set;}

        public UserEmail Email {get; private set;}

        public UserPhoneNumber PhoneNumber {get; private set;}

        public UserCC Cc { get ; private set ;}

        public UserPassword Password { get ; private set; }

        public RoleId RoleId { get; private set; }

        public bool Active { get; private set; }



        public User()
        {
            this.Active = true;
        }

        public User(int id,string fullName, string username, string phoneNumber, string cc,string password, RoleId roleId)
        {
            if (roleId == null)
                throw new BusinessRuleValidationException("Every user needs a role");
            this.Id = new UserId(id);
            this.FullName = new UserFullName(fullName);
            this.Username = new Username(username);
            this.Email = new UserEmail(username);
            this.PhoneNumber = new UserPhoneNumber(phoneNumber);
            this.RoleId = roleId;
            this.Password = new UserPassword(password);
            this.Cc = new UserCC(cc);

            this.Active = true;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }

        public bool getActive(){
            return Active;
        }
    }
}
