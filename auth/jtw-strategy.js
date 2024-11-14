import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/User.js";

/* -------------------------------------------------------------------------- */
/*                                    OPTS                                    */
/* -------------------------------------------------------------------------- */
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

/* -------------------------------------------------------------------------- */
/*                                 JwtStrategy                                */
/* -------------------------------------------------------------------------- */
export default new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});
