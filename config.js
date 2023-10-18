import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 3000, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://vsgate-s1.dei.isep.ipp.pt:10242",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    elevador: {
      name: "ElevadorController",
      path: "../controllers/elevadorController"
    },
    sala: {
      name: "SalaController",
      path: "../controllers/salaController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    elevador: {
      name: "ElevadorRepo",
      path: "../repos/elevadorRepo"
    },
    sala: {
      name: "SalaRepo",
      path: "../repos/salaRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    elevador: {
      name: "ElevadorService",
      path: "../services/elevadorService"
    },
    sala: {
      name: "SalaService",
      path: "../services/salaService"
    }
  },
};
