const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const uploader = require("../middleware/uploader");
const { verifyToken } = require("../middleware/verifyToken");
const { authorization } = require("../middleware/authorization");

// router.post("/file-upload",uploader.array("image"), userController.fileUpload);

router
  .route("/all")
  .get(verifyToken, authorization("admin"), userController.getUsers)
  .patch(verifyToken, authorization("admin"), userController.updateUsersRole);

router.post("/signup", uploader.array("image"), userController.signup);
router.post("/login", userController.findUserByEmail);
router.get("/me", verifyToken, userController.getMe);

module.exports = router;
