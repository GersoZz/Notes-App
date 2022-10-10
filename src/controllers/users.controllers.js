const userCtrl = {};

const passport = require("passport");

const User = require("../models/User");

userCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

userCtrl.signup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    //req.flash("error_msg");
    errors.push({ text: "Password do not match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characteres." });
  }

  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    //    res.send("signup successfully");
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The email is already in use");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password });
      console.log(newUser);
      newUser.password = await newUser.ecnryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered");
      res.redirect("/users/signin");
    }
  }
  //console.log(req.body);
  //res.send("received");
};

userCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

userCtrl.signin = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true,
});

/* userCtrl.signin = (req,res)=>{
  res.send('ga');
} */

userCtrl.logout = (req, res) => {
  /* ojito */
  req.logout((err) => {
    //P console.log(err)
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out now");
    res.redirect("/users/signin");
    //req.session.user = null;
    //res.send("logout");
  });
};

userCtrl.profile = (req, res) => {
  //console.log(res.locals.user);
  res.render("users/profile", res.locals.user);
};
module.exports = userCtrl;
