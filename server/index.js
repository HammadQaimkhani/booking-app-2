const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const User = require("./model/UserSchema.js");

require("dotenv").config();

// create the length of bycrpt password
const bycrptSlat = bycrpt.genSaltSync(10);

// set JWT secert key
const jwtSecert = "ajkakkajsfkasfksjk";

const app = express();

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(cookieParser());
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
        name: user.name,
      },
      jwtSecert,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } else {
    res.status(422).json("password is wrong");
  }
});

// create route for profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecert, async (err, tokenData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(tokenData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

// create a route for Logout.
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// create a route for upload photos.
app.post("/upload-by-links", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads" + newName,
  });
  res.json(__dirname + "/uploads" + newName);
});

// connection with database
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
