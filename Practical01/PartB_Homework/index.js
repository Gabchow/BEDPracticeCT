const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Homework API");
});

// Define route for About Page
app.get("/intro", (req, res) => {
  res.send("I am Gabriel");
});

// Define route for Contact Page
app.get("/name", (req, res) => {
  res.send("Gabriel Chow");
});

app.get("/hobbies", (req, res) => {
  res.send(["coding", "reading", "cycling"]);
});

app.get("/food", (req, res) => {
  res.send("I like to eat chicken");
});

app.get("/student", (req, res) => {
  res.json({
    name: "Alex",
    hobbies: ["coding", "reading", "cycling"],
    intro: "Hi, I'm Alex, a Year 2 student passionate about building APIs!"
  });
});
// Listen on the port after defining routes
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
