using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Shared;
using System;
using Microsoft.Extensions.Configuration;
using System.Xml;

namespace RobDroneGO.Domain.Users
{
    public class UserEmail : IValueObject
    {
        private readonly string DomainAtt;
        public string Email { get; private set; }

        public UserEmail(string username)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load("\\authentication\\emailConfig.xml"); 

            XmlNode domainNode = xmlDoc.SelectSingleNode("/emailConfiguration/domainName");
        
            DomainAtt = domainNode.InnerText;
            
            Email = username + DomainAtt;
        }

        public UserEmail() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString()
        {
            return Email;
        }
    }
}