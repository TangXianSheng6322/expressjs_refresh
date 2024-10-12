import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/_constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Deserialize User`);
  console.log(`Deserialized User Id: ${id}`);
  console.log(``);
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});
export default passport.use(
  new Strategy({ usernameField: "userName" }, (username, password, done) => {
    console.log(`Username ${username}`);
    console.log(`Password ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.userName === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
