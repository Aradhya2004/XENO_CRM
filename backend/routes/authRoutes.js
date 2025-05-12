const express = require("express");
const passport = require("passport");
const router = express.Router();
require('dotenv').config();

// Google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    req.session.save(() => {
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    });
  }
);

// Logout
router.get("/logout", (req, res, next) => {
   req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie("connect.sid"); 
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
});

// Get User Info
router.get("/user", (req, res) => {
  if (!req.user) {
    console.error("User not authenticated");
    return res.status(401).json({ error: "Unauthorized: No user data found" });
  }

  // console.log("User Info:", req.user);
  res.status(200).json(req.user);
});
module.exports = router;
