using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using RobDroneGO.Controllers;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;
using System;
using System.Threading.Tasks;
using Xunit;

namespace RobDroneGO.Tests.Controllers
{
    public class UsersControllerTests
    {
        private readonly Mock<IUserService> _userServiceMock;
        private readonly Mock<IConfiguration> _configMock;

        public UsersControllerTests()
        {
            _userServiceMock = new Mock<IUserService>();
            _configMock = new Mock<IConfiguration>();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var controller = new UsersController(_userServiceMock.Object, _configMock.Object);

            // Act
            var result = await controller.GetAll();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetById_ValidId_ReturnsOkResult()
        {
            var userId = 1;
            _userServiceMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync(new UserDto(1, "Joao", "jmm2isep.ipp.pt", "2141324134", "121243125", "Teste123456!", 2));
            var controller = new UsersController(_userServiceMock.Object, _configMock.Object);

            var result = await controller.GetById(userId);

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetById_InvalidId_ReturnsNotFoundResult()
        {
            var userId = 1;
            _userServiceMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync((UserDto)null); // Return null to simulate not found
            var controller = new UsersController(_userServiceMock.Object, _configMock.Object);

            var result = await controller.GetById(userId);

            Assert.IsType<NotFoundResult>(result.Result);
        }

    }

    internal class TestMethodAttribute : Attribute
    {
    }
}