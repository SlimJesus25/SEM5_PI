using System.Threading.Tasks;
using System.Collections.Generic;
using RobDroneGO.Domain.Shared;
using System;
using Microsoft.AspNetCore.Http;
using RobDroneGO.Domain.Roles;



namespace RobDroneGO.Domain.Users
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<UserDto> AddAsync(CreatingUserDto dto)
        {
            try{
                var user = new User(await GenerateId(), dto.FullName,dto.Username, dto.PhoneNumber, dto.Cc, dto.Password, new RoleId(dto.RoleId));
                await this._repo.AddAsync(user);
                await this._unitOfWork.CommitAsync();

                return new UserDto(user.Id.toInt(),user.FullName.toString(),user.Username.toString(), user.Email.toString(),user.PhoneNumber.toString(),user.Cc.toString(),user.Password.toString(),user.RoleId.toInt(),user.getActive());
                
            } catch (BusinessRuleValidationException ex){
                throw new BadHttpRequestException(ex.Message);
            }
        }

        /*public async Task<UserDto> UpdateAsync(UserDto dto)
        {
            var user = await this._repo.GetByNumberIdAsync(new UserIdNumber(dto.IdNumber)); 

            if (user == null)
                return null;   

            // change all fields
            /*if(dto.Description != null){
                user.ChangeDescription(dto.Description);
            }

            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.IdNumber.toInt(),user.Name.toString(), user.Description.toString(), user.getActive());
        }*/

        public async Task<List<UserDto>> GetAllAsync(){
            var list = await this._repo.GetAllAsync();

            List<UserDto> listDTO = list.ConvertAll<UserDto>(user => new UserDto(user.Id.toInt(),user.FullName.toString(),user.Username.toString(), user.Email.toString(),user.PhoneNumber.toString(),user.Cc.toString(),user.Password.toString(),user.RoleId.toInt(),user.getActive()));
        
            return listDTO;
        }
        
        public async Task<UserDto> GetByNumberIdAsync(UserId id)
        {
            var user = await this._repo.GetByNumberIdAsync(id);
            
            if(user == null)
                return null;

            return new UserDto(user.Id.toInt(),user.FullName.toString(),user.Username.toString(), user.Email.toString(),user.PhoneNumber.toString(),user.Cc.toString(),user.Password.toString(),user.RoleId.toInt(),user.getActive());
            }
    /*
        public async Task<UserDto> InactivateAsync(UserIdNumber id)
        {
            var user = await this._repo.GetByNumberIdAsync(id); 

            if (user == null)
                return null;   

            user.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.IdNumber.toInt(),user.Name.toString(), user.Description.toString(), user.getActive());
        }

        public async Task<UserDto> DeleteAsync(UserIdNumber id)
        {
            var user = await this._repo.GetByNumberIdAsync(id); 

            if (user == null)
                return null;   

            if (user.getActive())
                throw new BusinessRuleValidationException("It is not possible to delete an active user.");
            
            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(),user.IdNumber.toInt(), user.Name.toString(), user.Description.toString(), user.getActive());
        }
*/
        private async Task<int> GenerateId()
        {
            return await _repo.CountUsers() + 1;
        }
    }
}