const express = require("express");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.post("/test", (req, res, next) => {
  return res.status(200).json({ status: "ok" });
});

module.exports = app;
