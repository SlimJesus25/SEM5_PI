import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';

import express from 'express';

import Logger from './loaders/logger';

import cors from 'cors';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.use(cors());

  app.listen(config.port, () => {

    console.log("Server listening on port: " + config.port);

    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
    })
    .on('error', (err) => {      
      Logger.error(err);
      process.exit(1);
      return;
  });
}

startServer();
