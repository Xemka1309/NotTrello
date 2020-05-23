const express = require("express");
const checkListController = require("../controllers/checkListController.js");
const checkListRouter = express.Router();

checkListRouter.get("/get", checkListController.get);
checkListRouter.post("/add", checkListController.add);
checkListRouter.post("/addArray", checkListController.addArray);
checkListRouter.put("/edit", checkListController.edit);
checkListRouter.delete("/delete", checkListController.delete);

module.exports = checkListRouter;
