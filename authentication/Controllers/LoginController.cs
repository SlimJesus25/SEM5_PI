


using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Cmp;
using RobDroneGO.Domain;
using RobDroneGO.Domain.Users;

namespace RobDroneGO.Controllers{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config){
            _config = config;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login ([FromBody] UserLogin userLogin){
            var user = Authenticate(userLogin);

            if (user != null){
                var token = Generate((User)user);
                return Ok(token);
            }
            return NotFound("User not found!");
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new []
            {
              //  new Claim(ClaimTypes.NameIdentifier, user.Email.ToString()),
                new Claim(ClaimTypes.Email, user.Email.toString()),
                new Claim(ClaimTypes.GivenName, user.Name.ToString()),
                new Claim(ClaimTypes.Role, user.RoleId.Value.ToString()),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber.ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"], 
                claims,
                expires : DateTime.Now.AddMinutes(60),
                signingCredentials : credentials
            );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }

        private object Authenticate(UserLogin userLogin)
        {
            var currentUser = UserConstants.Users.FirstOrDefault(o =>
                o.Email.Email.ToString().ToLower() == userLogin.Email.ToLower() &&
                o.Password.Password.ToLower() == userLogin.Password.ToLower());
            if (currentUser != null){
                return currentUser;
            }
            return null;
        }
    }
}