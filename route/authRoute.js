// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { login } = require("../controller/authController");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Log in a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post("/login", login);

module.exports = router;
