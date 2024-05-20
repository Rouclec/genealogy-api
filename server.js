const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_CONNECTION_STRING

mongoose
  .set("strictQuery", true)
  .connect(DB)
  .then(() => {
    console.log("Connection Successful!");
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App is running on port : ", port);
});