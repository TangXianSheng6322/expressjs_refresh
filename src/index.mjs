import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, userName: "violet", displayName: "SLQueen" },
  { id: 2, userName: "sasha", displayName: "kOL" },
  { id: 3, userName: "nina", displayName: "Joomn" },
  { id: 4, userName: "mike", displayName: "TYSM" },
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
  } else {
    return res.status(200).send(mockUsers);
  }
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

app.put("/api/user/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findIndex === -1) return res.sendStatus(404);
  mockUsers[findIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

app.patch("/api/user/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/user/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.delete("/api/user", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  console.log(filter, value);

  if (filter === "all" && value === "true") {
    mockUsers.splice(0, mockUsers.length);
  }

  return res.status(200).send(mockUsers);
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
