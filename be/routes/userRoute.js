const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.put("/edit", userController.edit);

module.exports = userRouter;
