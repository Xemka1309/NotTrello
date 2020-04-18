const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;

const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: true }));

//routes
const homeRouter = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");

app.use("/", homeRouter);
app.use("/api/user", jsonParser, userRouter);
//end routes


app.listen(port, () => {
  console.log('We are live on ' + port);
});
