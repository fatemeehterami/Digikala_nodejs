const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
});

async function initDatabase() {
  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = 'Digikala';`
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "Digikala";`);
      console.log("Database 'Digikala' created.");
    } else {
      console.log("Database 'Digikala' already exists.");
    }
  } catch (err) {
    console.error("Error checking/creating database:", err);
  } finally {
    await client.end();
  }
}

module.exports = initDatabase;
