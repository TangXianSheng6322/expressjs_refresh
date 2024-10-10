import express from "express";
//routes
import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());
app.use(routes);

// app.use(resolveUserById);
// app.use(loggingMiddlewear);
//had to remove this for app to work again
//Oh, it's used to use it glabally, so no need to code app.use

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
