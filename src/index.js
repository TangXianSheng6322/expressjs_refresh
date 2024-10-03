import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ msg: "Hello" });
});

app.get("/api/user", (req, res) => {
  res.status(201).send([
    { id: 1, username: "violet", displayName: "SLQueen" },
    { id: 1, username: "sasha", displayName: "kOULL" },
    { id: 1, username: "nina", displayName: "Joomn" },
    { id: 1, username: "mike", displayName: "TYSM" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
