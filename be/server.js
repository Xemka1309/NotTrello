const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;

const jsonParser = bodyParser.json();

const DBInitInsert = require("./dbInitInserts");
//routes
const homeRouter = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");
const boardRouter = require("./routes/boardRoute");
const errorThrower = require("./errorResponseGenerator");

app.use("/", homeRouter);
app.use("/api/user", jsonParser, userRouter);
app.use("/api/board", jsonParser, boardRouter);
//end routes

//not found
app.use("/", errorThrower.notFound);

// Initial database inserts
DBInitInsert.init();

app.listen(port, () => {
  console.log('We are live on ' + port);
});
