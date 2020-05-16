const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const sockets         = require('./sockets');

const config = require('./config');
const port = config.serverPort;
const server    = app.listen(port, () => {
  console.log('We are live on ' + port);
});
sockets.listen(server);

app.set('jwt-secret', config.secret);

const jsonParser = bodyParser.json();

const DBInitInsert = require("./dbInitInserts");
const homeRouter = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");
const boardRouter = require("./routes/boardRoute");
const participantRouter = require("./routes/participantRoute");
const columnRouter = require("./routes/columnRoute");
const taskRouter = require("./routes/taskRoute");
const checkListRouter = require("./routes/checkListRoute");
const clItemRouter = require("./routes/checkListItemRoute");
const markRouter = require("./routes/markRoute");
const commentRouter = require("./routes/commentRoute");
const logRouter = require("./routes/logRoute");
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
app.use("/api/checklist", jsonParser, checkListRouter);
app.use("/api/clitem", jsonParser, clItemRouter);
app.use("/api/mark", jsonParser, markRouter);
app.use("/api/comment", jsonParser, commentRouter);
app.use("/api/log", jsonParser, logRouter);
//end routes

//not found
app.use("/", errorThrower.notFound);

// Initial database inserts
DBInitInsert.init();
