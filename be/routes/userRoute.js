const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.put("/edit", userController.edit);
userRouter.get("/", userController.get);
userRouter.get("/get", userController.getById);

module.exports = userRouter;
