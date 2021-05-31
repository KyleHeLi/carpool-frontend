const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("The mock server is working.");
});

app.post("/login", (req, res) => {
  res.json({
    token: "test123",
  });
});

app.listen(8080, () => {
  console.log("API is running on http://localhost:8080/login");
});
