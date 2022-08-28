import express from 'express';
import bodyParser from 'body-parser';
import mongoConnect from './config/config';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import coopRoutes from './routes/coop';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*'}));

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', coopRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true)
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    return res.status(200).json({});
  }
  return next();
});


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Cooperatives managements'
  });
});

app.use((req, res) => {
  res.type('json').status(404).json({
    message: '404 not found',
  });
});

const port = process.env.PORT || 6000;

app.listen(port ,() => console.log('Listening on localhost on port ' + port));
mongoConnect();