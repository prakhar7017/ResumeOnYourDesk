require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { profile } = require("console");
const app = express();

require("./middleware/passport-setup/passport");

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../views");

app.set("view engine", "ejs");
app.set("views", views_path);

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(
  cookieSession({
    name: "interactive-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.session());

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/google");
  }
}

app.get("/", (req, res) => {
  try {
    res.render("landingpage");
  } catch (error) {
    console.log(error);
    res.render("notfound");
  }
});

app.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));


app.get("/google/callback",passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("/tempelate");

  }
);

app.get("/tempelate",loggedIn,async(req,res,next)=>{
  try {
    res.render("resumetemplate");
  } catch (error) {
    res.status(400).json({message:"something went wrong"});
    
  }

})


app.listen(3000 || process.env.PORT, () => {
  console.log("connected");
});
