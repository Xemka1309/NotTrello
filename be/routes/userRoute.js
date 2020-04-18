const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.get("/add", userController.index);
userRouter.post("/add", userController.register);
userRouter.put("/edit", userController.edit);
userRouter.post("/login", userController.login);

module.exports = userRouter;
