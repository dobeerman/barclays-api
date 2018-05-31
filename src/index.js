import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import routes from './routes';

// Middleware
// import fetchAtms from './middlewares/fetch-atms';

// import atms from './routes/atms';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

// app.use(fetchAtms);

app.use('/api/v1.0/', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080')); // eslint-disable-line
