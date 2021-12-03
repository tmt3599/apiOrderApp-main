import express from "express";
import router from "./src/api/router.js";
import authCheck from "./src/middleware/index.js";
// const express = require("express");
const app = express();

const port = process.env.PORT||3003;

app.get("/", (req, res) => {
  res.send("API");
});

app.use(express.json());
app.use(express.urlencoded());
app.use(authCheck)
app.use("/", router);
// app.get("/test", (req, res) => {
//   res.send(controller.test());
// });

app.listen(port, () => {
  console.log("Server listen on port: ", port);
});
