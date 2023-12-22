using System.Threading.Tasks;
using System.Collections.Generic;
using RobDroneGO.Domain.Shared;
using Microsoft.AspNetCore.Http;
using RobDroneGO.Domain.Roles;



namespace RobDroneGO.Domain.Users
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        private readonly IRoleRepository _repoR;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo, IRoleRepository repoR)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoR = repoR;
        }

        public async Task<UserDto> AddUserAsync(CreatingUserDto dto)
        {
            try
            {
                var role = await this._repoR.GetByIdAsync(new RoleId(dto.RoleId));

                if (role == null)
                    return null;
                var user = new User(await GenerateId(), dto.Name, dto.Email, dto.PhoneNumber, dto.Password, role.Id);
                await this._repo.AddAsync(user);
                await this._unitOfWork.CommitAsync();

                return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.Password.toString(),user.RoleId.toInt());

            }
            catch (BusinessRuleValidationException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<UserDto> AddUtenteAsync(CreatingUserDto dto)
        {
            try
            {
                var role = await this._repoR.GetByIdAsync(new RoleId(dto.RoleId));

                if (role == null)
                    return null;
                var utente = new User(await GenerateId(), dto.Name, dto.Email, dto.PhoneNumber, dto.NIF,dto.Password, role.Id);
                await this._repo.AddAsync(utente);
                await this._unitOfWork.CommitAsync();

                return new UserDto(utente.Id.toInt(),utente.Name.toString(),utente.Email.toString(), utente.PhoneNumber.toString(), utente.Password.toString(), utente.NIF.toString(), utente.RoleId.toInt());

            }
            catch (BusinessRuleValidationException ex)
            {
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

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UserDto> listDTO = list.ConvertAll<UserDto>(user => new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.Password.toString(), user.NIF.toString(), user.RoleId.toInt()));

            return listDTO;
        }

        public async Task<UserDto> GetByNumberIdAsync(UserId id)
        {
            var user = await this._repo.GetByNumberIdAsync(id);

            if (user == null)
                return null;

            return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.Password.toString(), user.NIF.toString(), user.RoleId.toInt());
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