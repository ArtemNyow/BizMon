const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      const avatar = profile.photos?.[0]?.value;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await User.create({
        name: profile.displayName,
        email,
        googleId: profile.id,
        avatar,
      });

      return done(null, newUser);
    } catch (err) {
      return done(new Error('Google authentication failed'), null);
    }
  }
));

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

module.exports = passport;
