const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const config = require('./config');
const port = config.serverPort;
app.set('jwt-secret', config.secret);

const jsonParser = bodyParser.json();

const DBInitInsert = require("./dbInitInserts");
const homeRouter = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");
const boardRouter = require("./routes/boardRoute");
const participantRouter = require("./routes/participantRouter");
const columnRouter = require("./routes/columnRoute");
const taskRouter = require("./routes/taskRoute");
//const checkListRouter = require("./routes/checkListRoute");
const regAndAuthRouter = require("./routes/regAndAuthRoute");

const security = require('./services/auth');
const errorThrower = require("./errorResponseGenerator");

app.use("/api/user", jsonParser, regAndAuthRouter);
app.use("/", security.auth);
app.use("/api/user", jsonParser, userRouter);
app.use("/api", homeRouter);
app.use("/api/board", jsonParser, boardRouter);
app.use("/api/partic", jsonParser, participantRouter);
app.use("/api/column", jsonParser, columnRouter);
app.use("/api/task", jsonParser, taskRouter);
//app.use("/api/checklist", jsonParser, checkListRouter);
//end routes

//not found
app.use("/", errorThrower.notFound);

// Initial database inserts
DBInitInsert.init();

app.listen(port, () => {
  console.log('We are live on ' + port);
});
