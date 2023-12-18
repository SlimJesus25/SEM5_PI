using System.Threading.Tasks;
using System.Collections.Generic;
using RobDroneGO.Domain.Shared;
using System;
using Microsoft.AspNetCore.Http;


namespace RobDroneGO.Domain.Users
{
    public class UserService //: IUserService
    {
        /*private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<UserDto> AddAsync(CreatingUserDto dto)
        {
            try{
                var user = new User(Guid.NewGuid(), dto.Name, dto.Description);
                await this._repo.AddAsync(user);
                await this._unitOfWork.CommitAsync();

                return new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(),user.getActive());
                
            } catch (BusinessRuleValidationException ex){
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<UserDto> UpdateAsync(UserDto dto)
        {
            var user = await this._repo.GetByIdAsync(new UserId(dto.Id)); 

            if (user == null)
                return null;   

            // change all fields
            if(dto.Description != null){
                user.ChangeDescription(dto.Description);
            }

            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive());
        }

        public async Task<List<UserDto>> GetAllAsync(){
            var list = await this._repo.GetAllAsync();

            List<UserDto> listDTO = list.ConvertAll<UserDto>(user => new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive()));
        
            return listDTO;
        }

        /*public async Task<List<UserDto>> GetByDesignationAsync(UserDesignation userDesignation){
            var list = await this._repo.GetByDesignationAsync(userDesignation);

            List<UserDto> listDTO = list.ConvertAll<UserDto>(user => new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive()));
        
            return listDTO;
        }

        public async Task<UserDto> GetByIdAsync(UserId id)
        {
            var user = await this._repo.GetByIdAsync(id);
            
            if(user == null)
                return null;

            return new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive());
        }

        /*public async Task<UserDto> GetByNumberIdAsync(UserIdNumber id)
        {
            var user = await this._repo.GetByNumberIdAsync(id);
            
            if(user == null)
                return null;

            return new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive());
        }*/

        /*public async Task<UserDto> InactivateAsync(UserIdNumber id)
        {
            var user = await this._repo.GetByNumberIdAsync(id); 

            if (user == null)
                return null;   

            user.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive());
        }

        public async Task<UserDto> DeleteAsync(UserId id)
        {
            var user = await this._repo.GetByIdAsync(id); 

            if (user == null)
                return null;   

            if (user.getActive())
                throw new BusinessRuleValidationException("It is not possible to delete an active user.");
            
            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.getName(), user.getDescription(), user.getActive());
        }

        /*private async Task<int> GenerateID(){
            return await _repo.CountUsers() + 1;
        }

        public Task<UserDto> InactivateAsync(UserId id)
        {
            throw new NotImplementedException();
        }*/
    }
}