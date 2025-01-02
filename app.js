const express = require("express");
require("dotenv").config();
const app = express();
const indexRouter = require("./routes/indexRouter");
const path = require("node:path");
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Inventory application running on Port: ${PORT}`);
});
