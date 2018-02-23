import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import Api from './api';
import cookieParser from 'cookie-parser';
import ReactRenderer from './renderer';
import { httpsRedirect } from '$middleware';

const env = process.env.NODE_ENV || 'development';
const app = new express();

// Secure with helmet
app.use(helmet());

// Ensures SSL in used in production.
app.use(httpsRedirect({ enabled: env === 'production' }));

// parse cookies!
app.use(cookieParser());

// gzip
app.use(compression());

// Add middleware to serve up all static files
app.use(
  '/assets',
  express.static(path.join(__dirname, '../' + process.env.PUBLIC_OUTPUT_PATH)),
  express.static(path.join(__dirname, '../common/images')),
  express.static(path.join(__dirname, '../common/fonts'))
);

// handle browsers requesting favicon
app.use(
  '/favicon.ico',
  express.static(path.join(__dirname, '../common/images/favicon/favicon.ico'))
);

// Mount the REST API
app.use('/api', Api);

// Mount the react render handler

app.use('*', ReactRenderer);

module.exports = app;
