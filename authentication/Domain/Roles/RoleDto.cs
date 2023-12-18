using System;
namespace RobDroneGO.Domain.Roles
{
    public class RoleDto
    {
        public Guid Id { get; set; }
        public int IdNumber { get; private set;}
        public string Name { get; private set;}
        public string Description { get; private set; }
        public bool Active {get; private set; }

        public RoleDto(Guid Id,int idNumber, string name, string description,bool active)
        {
            this.Id = Id;
            this.IdNumber = idNumber;
            this.Name = name;
            this.Description = description;
            this.Active = active;
        }
    }
}