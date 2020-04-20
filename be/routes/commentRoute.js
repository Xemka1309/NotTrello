const express = require("express");
const commentController = require("../controllers/commentController.js");
const commentRouter = express.Router();

commentRouter.get("/get", commentController.get);
commentRouter.post("/add", commentController.add);
commentRouter.put("/edit", commentController.edit);
commentRouter.delete("/delete", commentController.delete);

module.exports = commentRouter;
