import express from "express";
const router = express.Router();

const data = [
  {
    id: 1,
    forename: "John",
    surname: "Johnes",
  },
  {
    id: 2,
    forename: "Dana",
    surname: "White",
  },
  {
    id: 3,
    forename: "Mike",
    surname: "Tyson",
  },
  {
    id: 4,
    forename: "Frank",
    surname: "Lampard",
  },
];

//Get all users from data
router.get("/", (req, res) => {
  res.status(200).json(data);
});

//Get user by ID
router.get("/:id", (req, res) => {
  let userId = Number(req.params.id);
  const user = data.find((user) => user.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ Error: "User not found" });
  }
});

//Post new user to data
router.post("/", (req, res) => {
  if (req.get("Content-Type") !== "application/json") {
    return res.status(415).json({ Error: "Unsupported Media Type" });
  }
  const forename = req.body.forename;
  const surname = req.body.surname;
  const newUser = { id: data.length + 1, forename, surname };

  data.push(newUser);
  res.status(201).json({ New_user: newUser });
});

//Delete user by id
router.delete("/:id", (req, res) => {
  let userId = Number(req.params.id);
  const userIndex = data.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    data.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ Error: "User not found" });
  }
});

//Update existing user or create a new one
router.put("/:id", (req, res) => {
  if (req.get("Content-Type") !== "application/json") {
    return res.status(415).json({ Error: "Unsupported Media Type" });
  }
  let userId = Number(req.params.id);
  const userIndex = data.findIndex((user) => user.id === userId);
  const forename = req.body.forename;
  const surname = req.body.surname;
  if (userIndex !== -1) {
    data[userIndex].forename = forename;
    data[userIndex].surname = surname;
    res.status(200).json({ Updated_user: data[userIndex] });
  } else {
    const newUser = { id: data.length + 1, forename, surname };
    data.push(newUser);
    res.status(201).json({ New_user: newUser });
  }
});

router.post("/search", (req, res) => {
  if (req.get("Content-Type") !== "application/json") {
    return res.status(415).json({ Error: "Unsupported Media Type" });
  }
  const forename = req.body.forename;
  const user = data.filter((user) => user.forename === forename);
  if (user.length > 0) {
    res.status(200).json({ users_found: user });
  } else {
    res.status(404).json({ Error: "User not found" });
  }
});

export default router;
