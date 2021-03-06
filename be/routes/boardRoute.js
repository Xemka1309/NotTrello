const express = require("express");
const boardController = require("../controllers/boardController.js");
const boardRouter = express.Router();

boardRouter.get("/get/types", boardController.getTypes);
boardRouter.get("/get/boards", boardController.getBoards);
boardRouter.get("/get/board", boardController.getBoard);
boardRouter.get("/get/particIdAndUserRole", boardController.getParticIdAndUserRole);
boardRouter.post("/add", boardController.add);
boardRouter.put("/edit", boardController.edit);
boardRouter.delete("/delete", boardController.delete);
boardRouter.get("/allowed", boardController.isActionAllowed);

module.exports = boardRouter;
