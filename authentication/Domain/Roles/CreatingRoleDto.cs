namespace RobDroneGO.Domain.Roles
{
    public class CreatingRoleDto
    {
        public string Name { get; set; }
        public string Description { get; set; }


        public CreatingRoleDto(string name, string description)
        {
            this.Name = name;
            this.Description = description;
        }
    }
}