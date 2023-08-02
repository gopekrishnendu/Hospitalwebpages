const bcrypt = require("bcrypt");
const User = require("./models/user");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://127.0.0.1:27017/HealthCare");
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected MnogoDB database!");
});

db.on("error", (e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Backend Started");
});

//Login
app.post("/signin", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    // hash(req.body.password);
    const data_password = await User.findOne({
      email: req.body.email,
    });
    if (data_password.password === req.body.password) {
      res.redirect(301, "http://127.0.0.1:5501/Frontend/main.html");
    }
  }
});

// const hash = (pass) => {
//   let saltRound = 10;
//   bcrypt.genSalt(saltRound, (error, salt) => {
//     bcrypt.hash(pass, salt, (error, hash) => {
//       console.log(hash);
//       return hash;
//     });
//   });
// };

// Sign Up
app.post("/signup", (req, res) => {
  try {
    console.log(req.body);
    if (req.body.email && req.body.password) {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      user.save();
      res.redirect(301, "http://127.0.0.1:5501/Frontend/signin.html");
    } else {
      res.send("Check credential");
    }
  } catch (error) {
    console.log("Error", error);
  }
});

app.listen(3000, () => console.log("sever started on port 3000 "));
