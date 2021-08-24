const verify = require("../varifyToken");
const router = require("express").Router();
const userController = require("../controllers/userController");

//get all user
router.get("/", userController.index);
//get single user
router.get("/:id", userController.show);
// get user stats

//Update
router.put("/:id", verify, userController.update);

//delete
router.delete("/:id", verify, userController.remove);

module.exports = router;
