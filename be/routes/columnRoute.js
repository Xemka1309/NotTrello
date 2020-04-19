const express = require("express");
const columnController = require("../controllers/columnController.js");
const columnRouter = express.Router();

columnRouter.get("/get", columnController.get);
columnRouter.post("/add", columnController.add);
columnRouter.put("/edit", columnController.edit);
columnRouter.delete("/delete", columnController.delete);

module.exports = columnRouter;
