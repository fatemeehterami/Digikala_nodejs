const express = require('express');
const { sendVerificationCode, verifyCode, checkMobile, registerUser, getUserProfile } = require('../controllers/authController');
const { verifyToken, blacklistToken } = require('../middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * /auth/send-code:
 *   post:
 *     summary: Send a verification code to the user's mobile number
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user
 *                 example: "09011111111"
 *     responses:
 *       200:
 *         description: Verification code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/send-code', sendVerificationCode);

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: Verify the code sent to the user's mobile
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user
 *                 example: "09011111111"
 *               code:
 *                 type: string
 *                 description: Verification code sent to the mobile
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid or expired code
 *       500:
 *         description: Internal Server Error
 */
router.post('/verify-code', verifyCode);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out successfully.
 *       401:
 *         description: Unauthorized or already logged out
 */
router.post('/logout', verifyToken, (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      blacklistToken(token);
    }
    return res.status(200).json({ message: 'User logged out successfully.' });
  });
  

/**
 * @swagger
 * /auth/check-mobile:
 *   get:
 *     summary: Check if mobile number exists
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: string
 *         required: true
 *         description: Mobile number to check
 *     responses:
 *       200:
 *         description: Returns whether the mobile exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       400:
 *         description: Invalid mobile number format
 */
router.get('/check-mobile', checkMobile);
  /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user with complete information
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - firstname
 *               - lastname
 *               - nationalcode
 *               - password
 *               - dateofbirth
 *               - email
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "09011111111"
 *               firstname:
 *                 type: string
 *                 example: "fateme"
 *               lastname:
 *                 type: string
 *                 example: "ehterami"
 *               nationalcode:
 *                 type: string
 *                 example: "0000000000"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               dateofbirth:
 *                 type: string
 *                 format: date
 *                 example: "2003-01-01"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "fateme@gmail.com"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields
 *       404:
 *         description: User with this mobile not found
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile by mobile
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: mobile
 *         required: true
 *         schema:
 *           type: string
 *         description: Mobile number of the user
 *     responses:
 *       200:
 *         description: User data
 */
router.get('/profile', getUserProfile);

module.exports = router;
