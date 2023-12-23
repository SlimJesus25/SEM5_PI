using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;
using Microsoft.AspNetCore.Http;
using RobDroneGO.Domain;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using RobDroneGO.Domain.Roles;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Routing;
using System.Linq;


namespace RobDroneGO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;
        private IConfiguration _config;


        public UsersController(IUserService service, IConfiguration config)
        {
            _service = service;
            _config = config;
        }

        // GET: api/Users
        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }


        // GET: api/Users?idNumber=idNumber
        [HttpGet("getById/{ID}")]
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            try
            {
                var user = await _service.GetByIdAsync(new UserId(id));

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

        }

        // POST: api/Users/
        [HttpPost("criarUser")]
        public async Task<ActionResult<UserDto>> CreateUser(CreatingUserDto dto)
        {
            var user = await _service.AddUserAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        // POST: api/Users/
        [HttpPost("criarUtente")]
        public async Task<ActionResult<UserDto>> CreateUtente(CreatingUserDto dto)
        {
            var user = await _service.AddUtenteAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        // GET: api/Users/login
        [HttpGet("login/{email}/{password}")]
        public async Task<IActionResult> Login(string email, string password)
        {
            try{
                var user = await _service.Login(new UserEmail(email),new UserPassword(password));

                if (user == null)
                {
                    return NotFound();
                }
                 var token = GenerateAsync(user);
                return Ok(token);
            }catch(BadHttpRequestException ex){
                return BadRequest(new {Message = ex.Message});
            }

        }

        private async Task<string> GenerateAsync(UserDto user)
        {
            User user1 = new User(user.Id, user.Name, user.Email, user.PhoneNumber,user.NIF, user.Password, new RoleId(user.RoleId));
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
              //  new Claim(ClaimTypes.NameIdentifier, user.Email.ToString()),
                new Claim(ClaimTypes.Email, user1.Email.Email),
            };


            switch (user1.RoleId.toInt())
        {
            case 1:
                claims.Add(new Claim(ClaimTypes.Role, "GestorUtilizadores"));
                break;
            case 2:
                claims.Add(new Claim(ClaimTypes.Role, "GestorCampus"));
                break;
            case 3:
                claims.Add(new Claim(ClaimTypes.Role, "GestorTarefas"));
                break;
            case 4:
                claims.Add(new Claim(ClaimTypes.Role, "GestorFrota"));
                break;
            case 5:
                claims.Add(new Claim(ClaimTypes.Role, "Utente"));
                break;
        }


            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }




            // PUT: api/Users/5
            [HttpPut("updateUser/{id}")]
            public async Task<ActionResult<UserDto>> Update(int id, UserDto dto)
            {
                if (id != dto.Id)
                {
                    return BadRequest();
                }

                try
                {
                    var user = await _service.UpdateAsync(dto);

                    if (user == null)
                    {
                        return NotFound();
                    }
                    return Ok(user);
                }
                catch(BusinessRuleValidationException ex)
                {
                    return BadRequest(new {Message = ex.Message});
                }
            }

            // DELETE: api/Users/5
            [HttpDelete("deleteUser/{id}")]
            public async Task<ActionResult<UserDto>> HardDelete(int id)
            {
                try
                {
                    var user = await _service.DeleteAsync(new UserId(id));

                    if (user == null)
                    {
                        return NotFound();
                    }

                    return Ok(user);
                }
                catch(BusinessRuleValidationException ex)
                {
                   return BadRequest(new {Message = ex.Message});
                }
            }
        }
    }