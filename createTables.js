const pool = require('./app/config/db');
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    mobile VARCHAR(11) NOT NULL UNIQUE PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    nationalcode VARCHAR(10) UNIQUE,
    password VARCHAR(8),
    dateofbirth DATE,
    email VARCHAR(255) UNIQUE,
    address VARCHAR(255),
    verification_code VARCHAR(6)
  );
`;

async function createTables() {
  try {
    await pool.query(createUsersTable);
    console.log("Table 'users' created or already exists.");
  } catch (err) {
    console.error("Error creating 'users' table:", err.message);
  }
}

module.exports = createTables;
