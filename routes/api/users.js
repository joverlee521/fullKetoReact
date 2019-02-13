const router = require("express").Router();
const userController = require("../../controllers/usersController");

router.route("/:id")
    .put(userController.update);

module.exports = router;