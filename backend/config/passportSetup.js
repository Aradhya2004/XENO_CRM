const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL :
        process.env.NODE_ENV === "production"
          ? "https://xeno-crm-backend-10ui.onrender.com/api/auth/google/callback"
          : "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      try {
        let user = await User.findOne({ googleId: id });

        if (!user) {
          user = new User({
            googleId: id,
            name: displayName,
            email: emails[0].value,
            profilePic: photos[0].value,
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);
