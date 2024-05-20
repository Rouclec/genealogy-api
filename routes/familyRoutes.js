const express = require("express");
const { login, protect, refreshToken, updatePasswword } = require("../controllers/authController");
const { addFamilyMember, getSibblings, getChildren, updateFamilyMember, getAllMembers, getFamilyMember } = require("../controllers/familyController");


const router = express.Router();

router.use(protect); //every route below this line, will pass through the protect middleware first
router.post("/",addFamilyMember)
router.get("/:id",getFamilyMember)
router.get("/",getAllMembers)
router.patch("/:id",updateFamilyMember)
router.get("/siblings/:id",getSibblings)
router.get("/children/:parent",getChildren)

module.exports = router;
