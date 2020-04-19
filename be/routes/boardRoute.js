const express = require("express");
const boardController = require("../controllers/boardController.js");
const boardRouter = express.Router();

boardRouter.get("/get/types", boardController.getTypes);
boardRouter.get("/get/boards", boardController.getBoards);
boardRouter.post("/add", boardController.add);
boardRouter.put("/edit", boardController.edit);
boardRouter.delete("/delete", boardController.delete);

module.exports = boardRouter;
