const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/authRoute');
const { swaggerUi, swaggerSpec } = require('./swagger');

const initDatabase = require('./initDatabase');
const createTables = require('./createTables');

const app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);

(async () => {
  await initDatabase();    
  await createTables();    
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();
