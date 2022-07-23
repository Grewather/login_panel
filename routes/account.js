const express = require("express");
const mysql = require("mysql");
const chalk = require("chalk");
const { response } = require("express");

const router = express.Router();

//mysql connect
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loginregisterusers",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(chalk.blueBright("Mysql connected"));
});

router.get("/", (req, res) => {
  // res.redirect("/");
  if (req.session.account == "") {
    res.redirect("/");
  } else {
    res.render("mainAcc", { name: req.session.account });
  }
});

router.get("/del", (req, res) => {
  let sql = `DELETE FROM users WHERE name='${req.session.account}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    if (result == "") {
      req.session.info = 4;
      res.redirect("/");
    } else {
      req.session.info = 5;
      res.redirect("/");
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.post("/log", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sql = `SELECT * FROM users WHERE name = '${username}' AND password ='${password}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    if (result == "") {
      req.session.info = 1;
      res.redirect("/");
    } else {
      req.session.account = username;
      res.redirect("/account");
    }
  });
});
router.post("/reg", (req, res) => {
  //TODO: TUTAJ ZROBIĆ REGISTERACJE
  let username = req.body.username;
  let password = req.body.password;
  let sql1 = `SELECT name FROM users WHERE name='${username}'`;
  let sql = `INSERT INTO users(name, password) VALUES('${username}', '${password}')`;
  let query = db.query(sql1, (err, result) => {
    if (err) throw err;
    // console.log(result);
    if (result == "") {
      let query1 = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result != "") {
          req.session.info = 3;
          res.redirect("/");
        } else {
          req.session.info = 4;
          res.redirect;
        }
      });
    } else {
      req.session.info = 2;
      res.redirect("/");
    }
  });
});
module.exports = router;
