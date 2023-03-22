const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const uploader = require("../middleware/uploader");
const { verifyToken } = require("../middleware/verifyToken");

// router.post("/file-upload",uploader.array("image"), userController.fileUpload);

router.get("/all", userController.getUsers);
router.post("/signup", uploader.array("image"), userController.signup);
router.post("/login", userController.findUserByEmail);
router.get("/me", verifyToken, userController.getMe);

module.exports = router;
