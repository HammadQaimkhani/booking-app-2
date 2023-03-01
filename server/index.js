const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const User = require("./model/UserSchema.js");
require("dotenv").config();

// create the length of bycrpt password
const bycrptSlat = bycrpt.genSaltSync(10);

// set JWT secert key
const jwtSecert = "ajkakkajsfkasfksjk";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());

// Register the user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password: bycrpt.hashSync(password, bycrptSlat),
  });
  res.json(user);
});

// post the data from db
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passok = bycrpt.compareSync(password, user.password);
  if (passok) {
    // create JWT token for Users
    jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      jwtSecert,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("User is login");
      }
    );
  } else {
    res.status(422).json("password is wrong");
  }
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
