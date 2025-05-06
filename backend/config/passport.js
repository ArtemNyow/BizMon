const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("✅ Google profile:", profile);

    const existingUser = await User.findOne({ email: profile.emails[0].value });

    if (existingUser) {
      console.log("✅ Існуючий користувач знайдений:", existingUser.email);
      return done(null, existingUser); // <-- Ключовий момент
    }

    const newUser = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
        avatar: profile.photos[0].value,
       
    });

    console.log("🆕 Створено нового користувача:", newUser.email);
    return done(null, newUser); // <-- Ключовий момент
  } catch (err) {
    console.error("❌ Google auth error:", err);
    return done(err, null); // <-- дуже важливо
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
