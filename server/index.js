const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json("hi i am running");
});

const port = 8080;

app.listen(port, () =>
  console.log(`server is running on port local host: ${8080}`)
);
