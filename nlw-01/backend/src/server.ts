import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

import routes from './routes';
import mongodb from './config/mongodb';

dotenv.config();

// Instância de Express
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

// Conecta ao MongoDB
mongodb();

app.listen(3333);
