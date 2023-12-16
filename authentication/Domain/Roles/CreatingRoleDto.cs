namespace RobDroneGO.Domain.Roles
{
    public class CreatingRoleDto
    {
        public string RoleName { get; set; }
        public string Description { get; set; }


        public CreatingRoleDto(string roleName, string description)
        {
            this.RoleName = roleName;
            this.Description = description;
        }
    }
}