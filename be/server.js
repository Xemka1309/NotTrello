const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;

const jsonParser = bodyParser.json();
//routes
const homeRouter = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");
const errorThrower = require("./errorResponseGenerator")

app.use("/", homeRouter);
app.use("/api/user", jsonParser, userRouter);
//end routes

//not found
app.use("/", errorThrower.notFound);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
