const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/UserSchema");
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  res.json(user);
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
