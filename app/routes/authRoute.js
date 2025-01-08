const express = require('express');
const { sendVerificationCode, verifyCode } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

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


module.exports = router;
