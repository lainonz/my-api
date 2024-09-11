const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUser } = require("../controller/userController");

router.get("/profile", authMiddleware, getUser);

module.exports = router;
