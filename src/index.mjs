import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "violet", displayName: "SLQueen" },
  { id: 2, username: "sasha", displayName: "kOL" },
  { id: 3, username: "nina", displayName: "Joomn" },
  { id: 4, username: "mike", displayName: "TYSM" },
];

app.get("/", (req, res) => {
  res.send({ msg: "Hello" });
});

app.get("/api/user", (req, res) => {
  // const { filter, value } = req.query;
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  res.status(201).send(mockUsers);
});

app.post("/api/user", (req, res) => {
  console.log(req.body);
  const { body } = req;

  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/user/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId))
    return res.status(400).send({ msg: "Bad Request. Invalid Id" });
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
