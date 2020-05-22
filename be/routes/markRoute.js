const express = require("express");
const markController = require("../controllers/markController.js");
const markRouter = express.Router();

markRouter.get("/get", markController.get);
markRouter.get("/getByBoardId", markController.getByBoardId);
markRouter.post("/add", markController.add);
markRouter.put("/edit", markController.edit);
markRouter.delete("/delete", markController.delete);

module.exports = markRouter;
