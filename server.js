const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The mock server is working.");
});

var mockUserDB = {
  user1: {
    username: "test@test.com",
    password: "test123",
    firstName: "Tester",
    lastName: "Test",
  },
};

app.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (
    mockUserDB.user1.username === username &&
    mockUserDB.user1.password === password
  ) {
    let r = res.json({
      token: "test123",
    });
    console.log(r.body);
  } else {
    res.sendStatus(400);
  }
});

app.post("/createUser", (req, res) => {
  let { username, password } = req.body;
});

app.listen(8080, () => {
  console.log("API is running on http://localhost:8080/login");
});
