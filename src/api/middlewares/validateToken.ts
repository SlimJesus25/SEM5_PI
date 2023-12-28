import { Role } from '../../../mdgt/src/domain/role';
var jwt = require('jsonwebtoken');
var config = require('../../../config')
import express, { Request, Response, NextFunction } from 'express';


function validateToken(req, res, next) {
    var auth = req.headers['authorization']
    if (!auth) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    var token = auth.split(' ')[1];
    jwt.verify(token, "hvkQVqwdqeaARucspooYjd81mcaz", function (err, decoded) { 
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    })
}

// Function to extract role from JWT
function extractRoleFromJWT(token: string): string | null {
    try {
      const decodedToken = jwt.decode(token) as { [key: string]: any };
  
      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        // Assuming the role is stored in 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }
  
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // extract email from jwt
  function extractEmailFromJWT(token: string): string | null {
    try {
      const decodedToken = jwt.decode(token) as { [key: string]: any };
      if (decodedToken && decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']) {
        // Assuming the role is stored in 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      }
  
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  // Middleware function for role-based authorization
  function authorize(roleToAuthorize: string) {
    return function(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const userRole = extractRoleFromJWT(token);
  
      if (!userRole || userRole !== roleToAuthorize) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // User is authorized, proceed to the next middleware or route handler
      next();
    };
  }
  // Function to compare email from JWT with the provided email
function authorizeEmail() {
  return function(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const userEmail = extractEmailFromJWT(token);
    const emailToCompare = req.params.email;

    if (!userEmail || userEmail !== emailToCompare) {
      console.log(userEmail);
      console.log(emailToCompare);
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Emails match, proceed with a 200 OK response
    next();
  };
}
  
module.exports = validateToken;
module.exports = authorize;
module.exports = authorizeEmail;