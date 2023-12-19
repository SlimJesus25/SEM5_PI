using System;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Roles;
namespace RobDroneGO.Domain.Roles
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {
        public RoleIdNumber IdNumber { get; private set;}
        public RoleName Name { get; private set;}
        public RoleDescription Description { get;  private set; }
        public bool Active{ get;  private set; }

        private Role()
        {
            this.Active = true;
        }

        public Role(Guid id, int idNumber, string name,string description)
        {
            this.Id = new RoleId(id);
            this.IdNumber = new RoleIdNumber(idNumber);
            this.Name = new RoleName(name);
            this.Description = new RoleDescription(description);
            this.Active = true;
        }

        /*public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive category.");
            this.Description = description;
        }*/
        public void MarkAsInative()
        {
            this.Active = false;
        }
       
        public bool getActive(){
            return Active;
        }
    }
}