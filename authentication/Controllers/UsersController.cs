using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;
using Microsoft.AspNetCore.Http;


namespace RobDroneGO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        

        // GET: api/Users?idNumber=idNumber
        [HttpGet("idNumber")]
        public async Task<ActionResult<UserDto>> GetGetById(int id)
        {
            try{
                var user = await _service.GetByNumberIdAsync(new UserId(id));

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }catch(BadHttpRequestException ex){
                return BadRequest(new {Message = ex.Message});
            }
            
        }

        // POST: api/Users/
        [HttpPost("User")]
        public async Task<ActionResult<UserDto>> CreateUser(CreatingUserDto dto)
        {
            var user = await _service.AddUserAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = user.Id }, user);
        }

        // POST: api/Users/
        [HttpPost("Utente")]
        public async Task<ActionResult<UserDto>> CreateUtente(CreatingUserDto dto)
        {
            var user = await _service.AddUtenteAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = user.Id }, user);
        }
        


        
        // PUT: api/Users/5
        /*[HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Update(int id, UserDto dto)
        {
            if (id != dto.IdNumber)
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

        // Inactivate: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDto>> SoftDelete(int id)
        {
            var user = await _service.InactivateAsync(new UserIdNumber(id));

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        // DELETE: api/Users/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<UserDto>> HardDelete(int id)
        {
            try
            {
                var user = await _service.DeleteAsync(new UserIdNumber(id));

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
        }*/
    }
}