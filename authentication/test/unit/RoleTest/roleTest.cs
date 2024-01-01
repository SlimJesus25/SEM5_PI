using Microsoft.VisualStudio.TestTools.UnitTesting;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Tests.Controllers;
using UserServiceTest;

namespace YourNamespace.Tests
{
    [TestClass]
    public class RoleTests
    {
        [TestMethod]
        public void RoleConstructor_ValidParameters_PropertiesSetCorrectly()
        {

            const int roleId = 1;
            const string roleName = "Admin";

            var role = new Role(roleId, roleName);

            Assert.AreEqual(roleId, role.Id.ToInt());
            Assert.AreEqual(roleName, role.Name.ToString());
        }

    }
}