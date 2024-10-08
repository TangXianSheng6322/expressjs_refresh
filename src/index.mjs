import express from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import { createValidationSchemas } from "./utils/validationSchemas.mjs";

const app = express();
app.use(express.json());

const loggingMiddlewear = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolveUserById = (req, res, next) => {
  const {
    params: { id },
  } = req;
  app.use(resolveUserById);
  app.use(loggingMiddlewear);

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findIndex === -1) return res.sendStatus(404);
  req.findIndex = findIndex;
  next();
};
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, userName: "violet", displayName: "SLQueen" },
  { id: 2, userName: "sasha", displayName: "kOL" },
  { id: 3, userName: "nina", displayName: "Joomn" },
  { id: 4, userName: "mike", displayName: "TYSM" },
];

app.get("/", loggingMiddlewear, (req, res) => {
  res.send({ msg: "Hello" });
});

app.get(
  "/api/user",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 4 })
    .withMessage(
      "Must should contain the minimum of 5 characters and the maximun of 10 characters"
    ),
  loggingMiddlewear,
  (req, res) => {
    // const { filter, value } = req.query;
    const {
      query: { filter, value },
    } = req;
    console.log(validationResult(req));
    if (filter && value) {
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    } else {
      return res.status(200).send(mockUsers);
    }
  }
);

app.post(
  "/api/user",
  // [
  //   body("userName")
  //     .notEmpty()
  //     .withMessage("Username cannot be empty")
  //     .isLength({ min: 5, max: 30 })
  //     .withMessage("Username should contain 5-30 characters")
  //     .isString()
  //     .withMessage("Username must be a string"),
  //   body("displayName").notEmpty(),
  // ],
  checkSchema(createValidationSchemas),
  (req, res) => {
    console.log(req.body);
    if (!validationResult(req).isEmpty()) {
      return res.status(400).send({ errors: validationResult(req).array() });
    }

    const data = matchedData(req);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  }
);

app.get("/api/user/:id", resolveUserById, (req, res) => {
  const { findIndex } = req;
  const findUser = mockUsers[findIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.put("/api/user/:id", resolveUserById, (req, res) => {
  const { body, findIndex } = req;

  mockUsers[findIndex] = { id: mockUsers[findIndex].id, ...body };
  return res.sendStatus(200);
});

app.patch("/api/user/:id", resolveUserById, (req, res) => {
  const { body, findIndex } = req;
  mockUsers[findIndex] = { ...mockUsers[findIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/user/:id", resolveUserById, (req, res) => {
  const { findIndex } = req;
  mockUsers.splice(findIndex, 1);
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
