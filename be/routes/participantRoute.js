const express = require("express");
const participantController = require("../controllers/participantController.js");
const participantRoute = express.Router();

participantRoute.get("/get", participantController.get);
participantRoute.post("/add", participantController.add);
participantRoute.put("/edit", participantController.edit);
participantRoute.delete("/delete", participantController.delete);

module.exports = participantRoute;
