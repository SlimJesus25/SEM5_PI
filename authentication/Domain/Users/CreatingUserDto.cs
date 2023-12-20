using Org.BouncyCastle.Crypto.Modes;
using RobDroneGO.Domain.Roles;

namespace RobDroneGO.Domain.Users
{
    public class CreatingUserDto
    {
        public string FullName {get; set; }
        public string Username { get; set; }
        //public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Cc { get; set; }

        public string Password { get; set; }

        public int RoleId { get; set; }


        public CreatingUserDto(string fullname, string username, string phoneNumber, string cc, string password, int roleId)
        {
            this.FullName = fullname;
            this.Username = username;
            //this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.Cc = cc;
            this.Password = password;
            this.RoleId = roleId;
        }
    }
}