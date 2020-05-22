const express = require("express");
const joinRouter = express.Router();
const boardJoinController = require("../controllers/boardJoinController");

joinRouter.get("/:str", boardJoinController.join);

module.exports = joinRouter;
