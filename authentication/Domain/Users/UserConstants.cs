
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using RobDroneGO.Domain.Users;

namespace RobDroneGO.Domain{
    public class UserConstants{

        public static List<User> Users = new List<User>()
        {
            new User(){
                Name = new UserName("José Pascoal"), Email = new UserEmail("josepascoal@isep.ipp.pt"), Active = true, Password = new UserPassword("12345"), PhoneNumber = new UserPhoneNumber("913333333"), RoleId = new Roles.RoleId("00000000-0000-0000-0000-000000000001")},

            };
        }
    }