const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7000;
app.use(cookieParser());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/ParkerPizza";

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("successfully connect to db");
  }
);

const apiRouter = require("./Routes/apiRoutes");
app.use("/", apiRouter);

app,
  listen(PORT, () => {
    console.log(`listening at: http://localhost:${PORT}`);
  });
