const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/invoice-man-fr"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "./dist/invoice-man-fr/" });
});

app.listen(process.env.PORT || 80);
