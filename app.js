const express = require("express");
const session = require("express-session");
const AccRoutes = require("./routes/account");

const app = express();
app.use(express.urlencoded());
app.use(express.json());

// session
app.use(
  session({
    secret: "secret phrase",
    resave: false,
    saveUninitialized: true,
  })
);

const port = process.env.PORT || 2139;

// view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  switch (req.session.info) {
    case 1:
      req.session.destroy();
      res.render("index", { info: "incorrect login/password" });
      break;
    case 2:
      req.session.destroy();
      res.render("index", { info: "User with this username exist" });
      break;

    case 3:
      req.session.destroy();
      res.render("index", {
        info: "registered successfully, you can login now",
      });
      break;
    case 4:
      req.session.destroy();
      res.render("index", {
        info: "something goes wrong",
      });
      break;

    case 5:
      req.session.destroy();
      res.render("index", { info: "Deleted successfuly" });

    default:
      res.render("index", { info: "" });
      break;
  }
});

app.use("/account", AccRoutes);

// port
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
