const pool = require('../config/db');

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createUserWithCode(mobile, code) {
    try {
        console.log('Mobile:', mobile);
        console.log('Code:', code);

        const res = await pool.query(
            `
            INSERT INTO users (mobile, verification_code)
            VALUES ($1, $2)
            ON CONFLICT (mobile) DO UPDATE
            SET verification_code = $2
            RETURNING *
            `,
            [mobile, code]
        );

        return res.rows[0];
    } catch (err) {
        console.error('Database Error:', err.message);
        throw err;
    }
}

async function getUserByMobileAndCode(mobile, code) {
    try {
        const res = await pool.query(
            `
            SELECT * FROM users
            WHERE mobile = $1 AND verification_code = $2
            `,
            [mobile, code]
        );

        return res.rows[0];
    } catch (err) {
        console.error('Database Error:', err.message);
        throw err;
    }
}

async function checkMobileExists(mobile) {
    try {
      const res = await pool.query(
        `
        SELECT 1 FROM users
        WHERE mobile = $1
        LIMIT 1
        `,
        [mobile]
      );
  
      return res.rowCount > 0;
    } catch (err) {
      console.error('Database Error:', err.message);
      throw err;
    }
  }
  async function getUserByMobile(mobile) {
    try {
      const res = await pool.query(
        `
        SELECT * FROM users
        WHERE mobile = $1
        `,
        [mobile]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Database Error:', err.message);
      throw err;
    }
  }
   

module.exports = { createUserWithCode, getUserByMobileAndCode, generateVerificationCode,checkMobileExists,getUserByMobile };
