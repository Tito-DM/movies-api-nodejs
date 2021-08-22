const router = require("express").Router();
const authController = require("../controllers/authController")



//registration
router.post("/register", authController.resgister )

//login
router.post("/login", authController.login)

module.exports = router