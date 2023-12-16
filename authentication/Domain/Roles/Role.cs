using System;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Roles
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {
        public string Name { get; private set;}

        public string Description { get;  private set; }

        public bool Active{ get;  private set; }

        private Role()
        {
            this.Active = true;
        }

        public Role(string name,string description)
        {
            this.Id = new RoleId(Guid.NewGuid());
            this.Name = name;
            this.Description = description;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive family.");
            this.Description = description;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}