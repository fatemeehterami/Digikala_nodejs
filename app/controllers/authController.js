const jwt = require('jsonwebtoken');
const { getUserByMobileAndCode, generateVerificationCode,createUserWithCode,checkMobileExists  } = require('../models/userModel');

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

module.exports = { sendVerificationCode, verifyCode,checkMobile };
