import './config/config.js';
import express from 'express';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import scrapeRoutes from './router/scrapeRoutes.js';
import trendRoutes from './router/trendRoute.js';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', express.static('public'));

app.use('/api', scrapeRoutes);
app.use('/api', trendRoutes);

app.use(errorHandler);

export default app;
