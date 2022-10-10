const { Router } = require("express");
const router = Router();

const {
  renderSignUpForm,
  renderSigninForm,
  signup,
  signin,
  logout,
  profile,
} = require("../controllers/users.controllers");

const { isAuthenticated } = require("../helpers/auth");

router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", signup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

router.get("/users/profile", isAuthenticated, profile);

//export default router;
module.exports = router;
