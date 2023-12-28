import { Role } from '../../../mdgt/src/domain/role';
var jwt = require('jsonwebtoken');
var config = require('../../../config')
import express, { Request, Response, NextFunction } from 'express';

interface Claims {
  role?: string;
  email?: string;
}

function extractClaims(token: string): Claims | null {
  try {
    const decodedToken = jwt.decode(token) as { [key: string]: any };
    const claims: Claims = {};

    if (decodedToken) {
      if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        claims.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }

      if (decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']) {
        claims.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      }

      return claims;
    }

    return null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}


// Function to extract role from JWT
/*function extractRoleFromJWT(token: string): string | null {
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
  }*/

  function authorize(roleToAuthorize: string) {
    return function(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const userRole = extractClaims(token).role;
  
      if (userRole !== roleToAuthorize) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // User is authorized, proceed to the next middleware or route handler
      next();
    };
  }
  
  // Middleware function for role-based authorization
  /*function authorize(roleToAuthorize: string) {
    return function(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const userRole = extractRoleFromJWT(token);
  
      if (userRole !== roleToAuthorize) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // User is authorized, proceed to the next middleware or route handler
      next();
    };
  }*/

  // Function to compare email from JWT with the provided email
function authorizeEmail() {
  return function(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const userEmail = extractClaims(token).email;
    const emailToCompare = req.params.email;

    if (userEmail !== emailToCompare) {
      console.log(userEmail);
      console.log(emailToCompare);
      return res.status(403).json({ message: 'Emails dont match' });
    }

    // Emails match, proceed with a 200 OK response
    next();
  };
}
  
module.exports = authorize;
module.exports = authorizeEmail;