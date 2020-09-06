const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//import router
const indexRouter = require("./routers/index");

//connecting to db
mongoose
  .connect("mongodb://localhost/crud-mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("db is connected"))
  .catch((e) => console.log(e));

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//router
app.use("/", indexRouter);

//start server
app.listen(app.get("port"), () => {
  console.log(`Server listen on port`, app.get("port"));
});
