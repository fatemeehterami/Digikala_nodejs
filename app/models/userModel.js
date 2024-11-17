const pool = require('../config/db');

async function createUserWithCode(mobile,code) {
    try{
        const res = await pool.query(`
            INSERT INTO users(mobile,verification_code)
            values($1,$2) ON CONFLICT (mobile) DO UPDATE SET
            verification_code = $2 RETURNING *
            `[mobile ,code])
            return res.rows[0]
    }catch(err){
        throw err;
    }
}

function generateVerificationCode(){
    return Math.floor(100000 + Math.random *900000)
}

module.exports = { createUserWithCode , generateVerificationCode}