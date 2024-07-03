const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const verify = async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false);
        }
    
        if (user.password !== password) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error)
    }
};

const options = {
    usernameField: "username",
    passwordField: "password",
};

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        cb(null, user);
    } catch (error) {
        return cb(error);
    }

});

passport.use('local', new LocalStrategy(options, verify));


module.exports = passport;
