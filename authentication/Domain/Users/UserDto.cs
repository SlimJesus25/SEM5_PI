using System;
using RobDroneGO.Domain.Roles;


namespace RobDroneGO.Domain.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email {get; set;}
    
        public string PhoneNumber {get; set;}
        
        public string Password { get; set; }

        public RoleId RoleId { get;  set; }

        public UserDto(Guid Id, string name, string email , string phoneNumber, string password, RoleId roleId)
        {
            this.Id = Id;
            this.Name = name;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.Password = password;
            this.RoleId = roleId;
        }
    }
}