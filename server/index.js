const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/register", (req, res) => {
  res.json("i am register");
});

mongoose.set("strictQuery", false);

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    `server is running on port local host: ${process.env.PORT} & Database is connected`
  );
});
