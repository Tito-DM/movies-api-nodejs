const router = require("express").Router();
const authController = require("../controllers/authController")



//registration
router.post("/register", authController.auth )

module.exports = router