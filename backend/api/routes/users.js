const verify = require("../varifyToken");
const router = require("express").Router();
const updateUser = require("../controllers/userController");
//get all user
router.get("/users");
//get single user

// get user stats

//Update
router.put("/:id", verify, updateUser);

//delete

module.exports = router;
