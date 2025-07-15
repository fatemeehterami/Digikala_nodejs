const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/authRoute');
const { swaggerUi, swaggerSpec } = require('./swagger');
const cors = require('cors');
const initDatabase = require('./initDatabase');
const createTables = require('./createTables');
const userRoutes = require('./app/routes/authRoute');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', userRoutes);


(async () => {
  await initDatabase();
  await createTables();

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();
