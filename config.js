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
    },
    edificio: {
      name: "EdificioController",
      path: "../controllers/edificioController"
    },
    passagem: {
      name: "PassagemController",
      path: "../controllers/passagemController"
    },
    robo: {
      name: "RoboController",
      path: "../controllers/roboController"
    },
    piso: {
      name: "PisoController",
      path: "../controllers/pisoController"
    },
    MapaEdificio: {
      name: "MapaEdificioController",
      path: "../controllers/mapaEdificioController"
    },
    TipoRobo: {
      name: "TipoRoboController",
      path: "../controllers/tipoRoboController"
    },
    Tarefa: {
      name: "TarefaController",
      path: "../controllers/tarefaController"
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
    },
    edificio: {
      name: "EdificioRepo",
      path: "../repos/edificioRepo"
    },
    passagem: {
      name: "PassagemRepo",
      path: "../repos/passagemRepo"
    },
    robo: {
      name: "RoboRepo",
      path: "../repos/roboRepo"
    },
    piso: {
      name: "PisoRepo",
      path: "../repos/pisoRepo"
    },
    MapaEdificio: {
      name: "MapaEdificioRepo",
      path: "../repos/mapaEdificioRepo"
    },
    TipoRobo: {
      name: "TipoRoboRepo",
      path: "../repos/tipoRoboRepo"
    },
    Tarefa: {
      name: "TarefaRepo",
      path: "../repos/tarefaRepo"
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
    },
    edificio: {
      name: "EdificioService",
      path: "../services/edificioService"
    },
    passagem: {
      name: "PassagemService",
      path: "../services/passagemService"
    },
    robo: {
      name: "RoboService",
      path: "../services/roboService"
    },
    piso: {
      name: "PisoService",
      path: "../services/pisoService"
    },
    MapaEdificio: {
      name: "MapaEdificioService",
      path: "../services/mapaEdificioService"
    },
    TipoRobo: {
      name: "TipoRoboService",
      path: "../services/tipoRoboService"
    },
    Tarefa: {
      name: "TarefaService",
      path: "../services/tarefaService"
    }
  },
};
