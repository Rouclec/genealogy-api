const express = require("express");
const { login, protect, refreshToken, updatePasswword, signup } = require("../controllers/authController");


const router = express.Router();

router.post("/signup",signup)
router.post("/login", login);
router.post("/refresh-token", refreshToken);
// router.post("/forgot-password", forgotPassword);
// router.patch("/reset-password/:token", resetPassword);

router.use(protect); //every route below this line, will pass through the protect middleware first
router.patch("/update-password", updatePasswword);

module.exports = router;
