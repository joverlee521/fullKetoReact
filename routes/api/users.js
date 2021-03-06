const router = require("express").Router();
const userController = require("../../controllers/usersController");

router.route("/:id")
    .put(userController.checkAuth, userController.update)
    .delete(userController.checkAuth, userController.delete);

module.exports = router;