const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const config = require('./config');
const port = config.serverPort;
app.set('jwt-secret', config.secret);

const jsonParser = bodyParser.json();

const DBInitInsert = require("./dbInitInserts");
//routes
const homeRouter = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");
const security = require('./security/auth');
const boardRouter = require("./routes/boardRoute");
const errorThrower = require("./errorResponseGenerator");

app.use("/api/user", jsonParser, userRouter);
app.use("/", security.auth);
app.use("/api", homeRouter);
app.use("/api/board", jsonParser, boardRouter);
//end routes

//not found
app.use("/", errorThrower.notFound);

// Initial database inserts
DBInitInsert.init();

app.listen(port, () => {
  console.log('We are live on ' + port);
});
