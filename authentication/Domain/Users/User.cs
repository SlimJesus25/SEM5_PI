using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
//
namespace RobDroneGO.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
        public UserName Name {get; private set;}

        public UserEmail Email {get; private set;}

        public UserPhoneNumber PhoneNumber {get; private set;}

        public UserNIF NIF { get ; private set ;}

        public UserPassword Password { get ; private set; }

        public RoleId RoleId { get; private set; }

        public User()
        {
        }

        public User(int id,string name, string email,string phoneNumber, string nif,string password, RoleId roleId)
        {
            if (roleId == null)
                throw new BusinessRuleValidationException("Every user needs a role");
            this.Id = new UserId(id);
            this.Name = new UserName(name);
            this.Email = new UserEmail(email);
            this.PhoneNumber = new UserPhoneNumber(phoneNumber);
            this.NIF = new UserNIF(nif);
            this.Password = new UserPassword(password);
            this.RoleId = roleId;
        }

        public User(int id,string name, string email, string phoneNumber, string password, RoleId roleId)
        {
            if (roleId == null)
                throw new BusinessRuleValidationException("Every user needs a role");
            this.Id = new UserId(id);
            this.Name = new UserName(name);
            this.Email = new UserEmail(email);
            this.PhoneNumber = new UserPhoneNumber(phoneNumber);
            this.Password = new UserPassword(password);
            this.RoleId = roleId;
        }

        public void AlterarNome(string name){
            this.Name = new UserName(name);
        }

        public void AlterarPhoneNumber(string phoneNumber){
            this.PhoneNumber = new UserPhoneNumber(phoneNumber);
        }

        public void AlterarNif(string nif){
            this.NIF = new UserNIF(nif);
        }

        public void AlterarPassword(string password){
            this.Password = new UserPassword(password);
        }

        public void AlterarRoleId(int roleId){
            this.RoleId = new RoleId(roleId);
        }
    }
}
