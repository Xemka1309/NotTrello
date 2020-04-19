const express = require("express");
const regAndAuthController = require("../controllers/regAndAuthController.js");
const regAndAuthRouter = express.Router();

regAndAuthRouter.post("/add", regAndAuthController.register);
regAndAuthRouter.post("/login", regAndAuthController.login);

module.exports = regAndAuthRouter;
