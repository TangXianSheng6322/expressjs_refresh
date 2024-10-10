import express from "express";
//routes
import routes from "./routes/_index.mjs";
//middlewear
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(routes);

// app.use(resolveUserById);
// app.use(loggingMiddlewear);
//had to remove this for app to work again
//Oh, it's used to use it glabally, so no need to code app.use

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });
  res.send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
