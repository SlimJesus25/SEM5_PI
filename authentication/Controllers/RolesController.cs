using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Roles;
using Microsoft.AspNetCore.Http;


namespace RobDroneGO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _service;

        public RolesController(IRoleService service)
        {
            _service = service;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Roles?idNumber=idNumber
        [HttpGet("idNumber")]
        public async Task<ActionResult<RoleDto>> GetGetByIdNumber(int id)
        {
            try{
                var del = await _service.GetByNumberIdAsync(new RoleIdNumber(id));

                if (del == null)
                {
                    return NotFound();
                }

                return del;
            }catch(BadHttpRequestException ex){
                return BadRequest(new {Message = ex.Message});
            }
            
        }

        // POST: api/Roles
        [HttpPost]
        public async Task<ActionResult<RoleDto>> Create(CreatingRoleDto dto)
        {
            var role = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetByIdNumber), new { id = role.Id }, role);
        }

        
        // PUT: api/Roles/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RoleDto>> Update(int id, RoleDto dto)
        {
            if (id != dto.IdNumber)
            {
                return BadRequest();
            }

            try
            {
                var role = await _service.UpdateAsync(dto);
                
                if (role == null)
                {
                    return NotFound();
                }
                return Ok(role);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RoleDto>> SoftDelete(int id)
        {
            var role = await _service.InactivateAsync(new RoleIdNumber(id));

            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }
        
        // DELETE: api/Roles/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<RoleDto>> HardDelete(int id)
        {
            try
            {
                var role = await _service.DeleteAsync(new RoleIdNumber(id));

                if (role == null)
                {
                    return NotFound();
                }

                return Ok(role);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}