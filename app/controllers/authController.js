const jwt = require('jsonwebtoken');
const { getUserByMobileAndCode, generateVerificationCode,createUserWithCode } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

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

module.exports = { sendVerificationCode, verifyCode };
