using System;


namespace RobDroneGO.Domain.Roles
{
    public class RoleDto
    {
        public Guid Id { get; set; }

        public string Name { get; set;}

        public string Description { get; set; }

        public RoleDto(Guid Id, string name, string description)
        {
            this.Id = Id;
            this.Name = name;
            this.Description = description;
        }
    }
}