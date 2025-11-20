const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const USERS = [
  { username: "skyviv", password: "interview1o1" },
];

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  // Check if input is missing
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  // Check for invalid username format
  if (typeof username !== "string" || username.length < 3) {
    return res.status(422).json({ error: "Invalid username format." });
  }

  // Check for invalid password format
  if (typeof password !== "string" || password.length < 6) {
    return res.status(422).json({ error: "Invalid password format." });
  }

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  // Success
  res.status(200).json({ message: "Signin successful!" });
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
});
