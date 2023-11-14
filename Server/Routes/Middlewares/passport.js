const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const { User } = require("../db");

const jwtOptions = {
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// passport.use(
//   new JwtStrategy(jwtOptions, async (payload, done) => {
//     try {
//       const user = await User.findByPk(payload.userId);
//       if (!user) {
//         return done(null, false);
//       }
//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   })
// );

// module.exports = passport;
// module.exports = passport.initialize();