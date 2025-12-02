import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import BaseRouter from '@src/routes';
import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes log en DEV
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Sécurité
if (ENV.NodeEnv === NodeEnvs.Production) {
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// API principale (toutes les routes de chats)
app.use(Paths.Chats.Base, BaseRouter);

// **** Error Handler **** //
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

// **** Documentation API **** //

// dossier des vues
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// dossier static
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// DOCUMENTATION (Swagger-like)
app.get('/api-docs', (req, res) => {
  res.set('Content-Security-Policy', 'script-src blob:; worker-src blob:;');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// PAGE D'ACCUEIL → REDIRECT API DOCS
app.get('/', (_: Request, res: Response) => {
  res.redirect('/api-docs');
});

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
