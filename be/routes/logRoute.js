const express = require("express");
const logController = require("../controllers/logController.js");
const logRouter = express.Router();

logRouter.get("/get", logController.get);
logRouter.post("/add", logController.add);
logRouter.delete("/delete", logController.delete);

module.exports = logRouter;
