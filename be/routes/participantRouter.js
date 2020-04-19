const express = require("express");
const participantController = require("../controllers/participantController.js");
const participantRouter = express.Router();

participantRouter.get("/get", participantController.get);
participantRouter.post("/add", participantController.add);
participantRouter.put("/edit", participantController.edit);
participantRouter.delete("/delete", participantController.delete);

module.exports = participantRouter;
