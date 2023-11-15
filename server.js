const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/BetterStuffFrontEnd"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "./dist/BetterStuffFrontEnd/" });
});

app.listen(process.env.PORT || 80);
