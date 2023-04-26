const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const User = require("./model/UserSchema.js");
const Place = require("./model/place.js");
const Booking = require("./model/booking.js");
const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");

require("dotenv").config();

// create the length of bycrpt password
const bycrptSlat = bycrpt.genSaltSync(10);

// set JWT secert key
const jwtSecert = process.env.JWT_SECERET;

const app = express();

// middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.BASE_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

// function to check the booking of separate users.
const getUserDataFromToken = req => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecert, async (err, tokenData) => {
      if (err) throw err;
      resolve(tokenData);
    });
  });
};

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

// create a route for upload photos by link.
app.post("/upload-by-links", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

// create a route for upload photo by button.
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/uploads", photosMiddleware.array("photos", 100), (req, res) => {
  const uplodedFile = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uplodedFile.push(newPath.replace("uploads", ""));
  }
  res.json(uplodedFile);
});

// create a route for sumbited the data into DB.
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhoto,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecert, async (err, tokenData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: tokenData.id,
      title,
      address,
      photos: addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

// create a get route to get data of places from DB.
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecert, async (err, tokenData) => {
    if (err) throw err;
    const { id } = tokenData;
    res.json(await Place.find({ owner: id }));
  });
});

// create a route for Get data with ID.
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// create a route to update the existing data.
app.put("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhoto,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecert, async (err, tokenData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (tokenData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhoto,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

// create a route for home screen places.
app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

// create a route for Place page.
app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// create a route to store booking site.
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkOut, maxGuests, name, mobile, price } = req.body;
  res.json(
    await Booking.create({
      place,
      user: userData.id,
      checkIn,
      checkOut,
      maxGuests,
      name,
      mobile,
      price,
    })
  );
});

// create GET route for get the data of booking.
app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  // check that user in login or not.
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
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
