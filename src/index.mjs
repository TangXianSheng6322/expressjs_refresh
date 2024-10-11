import express, { response } from "express";
//routes
import routes from "./routes/_index.mjs";
//middlewear
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/_constants.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "ScoobyDoo",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);
app.use(routes);

// app.use(resolveUserById);
// app.use(loggingMiddlewear);
//had to remove this for app to work again
//Oh, it's used to use it globally, so no need to code app.use

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });
  res.send({ msg: "Hello" });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { userName, password },
  } = req;
  const findUser = mockUsers.find((user) => user.userName === userName);
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "BAD CREDENTIALS" });

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;

  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
