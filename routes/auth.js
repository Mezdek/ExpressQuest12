const authRouter = require("express").Router();
const User = require("../models/user");

const { calculateToken } = require("../helpers/users");

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (user) {
      User.verifyPassword(password, user.hashedPassword).then(
        (passwordIsCorrect) => {
          if (passwordIsCorrect) {
            const token = calculateToken(user.email);
            User.update(user.id, { token });
            res.cookie("token", token);
            res.json({message: "You are logged in"});
          } else {
            res.status(401).json({ message: "Credentials are incorrect" });
          }
        }
      );
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

module.exports = authRouter;
