using System;
using Microsoft.Net.Http.Headers;
using Org.BouncyCastle.Asn1.Misc;
using RobDroneGO.Domain.Roles;


namespace RobDroneGO.Domain.Users
{
    public class UserDto
    {
        public int Id { get; private set;}

        public string FullName {get; private set;}

        public string Username { get; private set; }

        public string Email {get; private set;}
    
        public string PhoneNumber {get; private set;}

        public string Cc { get; private set;}
        
        public string Password { get; private set; }

        public int RoleId { get;  private set; }

        public bool Active { get ; private set;}

        public UserDto( int id, string fullName, string username, string email , string phoneNumber, string cc, string password, int roleId, bool active)
        {
            this.Id = id;
            this.FullName = fullName;
            this.Username = username;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.Cc = cc;
            this.Password = password;
            this.RoleId = roleId;
            this.Active = active;
        }
    }
}