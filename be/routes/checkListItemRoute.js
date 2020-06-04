const express = require("express");
const clItemController = require("../controllers/checkListItemController.js");
const clItemRouter = express.Router();

clItemRouter.get("/get", clItemController.get);
clItemRouter.post("/add", clItemController.add);
clItemRouter.put("/edit", clItemController.edit);
clItemRouter.delete("/delete", clItemController.delete);

module.exports = clItemRouter;
