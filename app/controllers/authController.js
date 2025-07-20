const jwt = require('jsonwebtoken');
const { getUserByMobileAndCode, generateVerificationCode,createUserWithCode,checkMobileExists, getUserByMobile  } = require('../models/userModel');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

function validateMobile(mobile) {
    return /^09\d{9}$/.test(mobile);
  }
  
function sendError(res, status, message) {
    return res.status(status).json({ message });
}

const sendVerificationCode = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ message: 'Mobile number is required' });
    }

    try {
        const code = generateVerificationCode(); 

        const user = await createUserWithCode(mobile, code);

        const token = jwt.sign({ mobile: user.mobile }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Verification code generated successfully',
            token,
        });
    } catch (err) {
        console.error('Controller Error:', err.message);
        res.status(500).json({
            message: 'An internal server error occurred',
            error: err.message,
        });
    }
};

const verifyCode = async (req, res) => {
    const { mobile, code } = req.body;

    if (!mobile || !code) {
        return res.status(400).json({ message: 'Mobile and code are required' });
    }

    try {
        const user = await getUserByMobileAndCode(mobile, code);

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        const token = jwt.sign({ mobile: user.mobile }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Verification successful',
            token,
        });
    } catch (err) {
        console.error('Controller Error:', err.message);
        res.status(500).json({
            message: 'An internal server error occurred',
            error: err.message,
        });
    }
};

const checkMobile = async (req, res) => {
    const { mobile } = req.query;
  
    if (!mobile || !validateMobile(mobile)) {
      return sendError(res, 400, 'Invalid mobile number');
    }
  
    try {
      const exists = await checkMobileExists(mobile);
      return res.status(200).json({ exists });
    } catch (err) {
      console.error('Controller Error:', err.message);
      return sendError(res, 500, 'Server error');
    }
  };

  const registerUser = async (req, res) => {
    const { mobile, firstname, lastname, nationalcode, password, dateofbirth, email , address } = req.body;
  
    if (!mobile || !firstname || !lastname || !nationalcode || !password || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const query = `
        UPDATE users
        SET firstname = $1,
            lastname = $2,
            nationalcode = $3,
            password = $4,
            dateofbirth = $5,
            email = $6,
            address = $7
        WHERE mobile = $8
        RETURNING *;
      `;
      const values = [firstname, lastname, nationalcode, password, dateofbirth, email, address, mobile];
  
      const result = await pool.query(query, values);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found with this mobile' });
      }
  
      return res.status(200).json({
        message: 'User registered successfully',
        user: result.rows[0],
      });
    } catch (err) {
      console.error('Register Error:', err.message);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };
  const getUserProfile = async (req, res) => {
    const { mobile } = req.query;
  
    if (!mobile) {
      return res.status(400).json({ message: 'Mobile is required' });
    }
  
    try {
      const user = await getUserByMobile(mobile);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };  

module.exports = { sendVerificationCode, verifyCode,checkMobile,registerUser,getUserProfile };
